#!/usr/bin/env node

/**
 * Automated Security Check Script
 * 
 * This script performs comprehensive security checks on the application:
 * - Runs npm audit for vulnerability scanning
 * - Checks for outdated packages
 * - Generates security reports
 * - Provides recommendations for fixes
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  auditLevel: process.env.AUDIT_LEVEL || 'moderate',
  outputDir: 'security-reports',
  reportFile: 'security-report.json',
  summaryFile: 'security-summary.txt'
};

class SecurityChecker {
  constructor() {
    this.vulnerabilities = {};
    this.outdatedPackages = [];
    this.timestamp = new Date().toISOString();
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async runCommand(command, description) {
    this.log(`Running: ${description}`);
    try {
      const output = execSync(command, { 
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe']
      });
      return output;
    } catch (error) {
      // npm audit returns exit code 1 when vulnerabilities are found
      if (command.includes('npm audit') && error.status === 1) {
        return error.stdout;
      }
      throw error;
    }
  }

  async checkVulnerabilities() {
    this.log('🔍 Checking for security vulnerabilities...');
    
    try {
      // Run npm audit and get JSON output
      const auditOutput = await this.runCommand(
        'npm audit --json',
        'NPM security audit'
      );
      
      const auditData = JSON.parse(auditOutput);
      this.vulnerabilities = auditData.metadata?.vulnerabilities || {};
      
      // Summary
      const total = this.vulnerabilities.total || 0;
      if (total === 0) {
        this.log('✅ No vulnerabilities found!');
      } else {
        this.log(`Found ${total} vulnerabilities:`, 'warn');
        this.log(`  Critical: ${this.vulnerabilities.critical || 0}`, 'error');
        this.log(`  High: ${this.vulnerabilities.high || 0}`, 'warn');
        this.log(`  Moderate: ${this.vulnerabilities.moderate || 0}`, 'warn');
        this.log(`  Low: ${this.vulnerabilities.low || 0}`);
      }
      
      return auditData;
    } catch (error) {
      this.log(`Error running security audit: ${error.message}`, 'error');
      throw error;
    }
  }

  async checkOutdatedPackages() {
    this.log('📦 Checking for outdated packages...');
    
    try {
      const outdatedOutput = await this.runCommand(
        'npm outdated --json',
        'Check outdated packages'
      );
      
      if (outdatedOutput.trim()) {
        const outdatedData = JSON.parse(outdatedOutput);
        this.outdatedPackages = Object.entries(outdatedData).map(([name, info]) => ({
          name,
          current: info.current,
          wanted: info.wanted,
          latest: info.latest,
          location: info.location
        }));
        
        this.log(`Found ${this.outdatedPackages.length} outdated packages`);
      } else {
        this.log('✅ All packages are up to date!');
      }
      
      return this.outdatedPackages;
    } catch (error) {
      // npm outdated returns exit code 1 when outdated packages exist
      if (error.status === 1 && error.stdout) {
        // Parse the stdout to get outdated package info
        try {
          const outdatedData = JSON.parse(error.stdout);
          this.outdatedPackages = Object.entries(outdatedData).map(([name, info]) => ({
            name,
            current: info.current,
            wanted: info.wanted,
            latest: info.latest,
            location: info.location
          }));
          this.log(`Found ${this.outdatedPackages.length} outdated packages`);
          return this.outdatedPackages;
        } catch (parseError) {
          this.log(`Error parsing outdated packages: ${parseError.message}`, 'warn');
          return [];
        }
      }
      this.log(`Error checking outdated packages: ${error.message}`, 'warn');
      return [];
    }
  }

  async generateReport() {
    this.log('📊 Generating security report...');
    
    // Ensure output directory exists
    const outputDir = path.join(process.cwd(), CONFIG.outputDir);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Prepare report data
    const report = {
      timestamp: this.timestamp,
      vulnerabilities: this.vulnerabilities,
      outdatedPackages: this.outdatedPackages,
      summary: {
        totalVulnerabilities: this.vulnerabilities.total || 0,
        criticalVulnerabilities: this.vulnerabilities.critical || 0,
        highVulnerabilities: this.vulnerabilities.high || 0,
        outdatedPackagesCount: this.outdatedPackages.length
      },
      recommendations: this.generateRecommendations()
    };
    
    // Write JSON report
    const reportPath = path.join(outputDir, CONFIG.reportFile);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    this.log(`📄 Report saved to: ${reportPath}`);
    
    // Write human-readable summary
    const summaryPath = path.join(outputDir, CONFIG.summaryFile);
    const summary = this.generateSummary(report);
    fs.writeFileSync(summaryPath, summary);
    this.log(`📄 Summary saved to: ${summaryPath}`);
    
    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    
    // Security recommendations
    if (this.vulnerabilities.critical > 0) {
      recommendations.push({
        priority: 'CRITICAL',
        action: 'Run npm audit fix immediately to address critical vulnerabilities',
        command: 'npm audit fix'
      });
    }
    
    if (this.vulnerabilities.high > 0) {
      recommendations.push({
        priority: 'HIGH',
        action: 'Address high severity vulnerabilities',
        command: 'npm audit fix'
      });
    }
    
    if (this.vulnerabilities.moderate > 0) {
      recommendations.push({
        priority: 'MEDIUM',
        action: 'Review and fix moderate severity vulnerabilities',
        command: 'npm audit fix'
      });
    }
    
    // Update recommendations
    if (this.outdatedPackages.length > 0) {
      const securityPackages = this.outdatedPackages.filter(pkg => 
        pkg.name.includes('security') || 
        pkg.name.includes('audit') ||
        ['next', 'react', 'react-dom', '@supabase/supabase-js'].includes(pkg.name)
      );
      
      if (securityPackages.length > 0) {
        recommendations.push({
          priority: 'HIGH',
          action: 'Update security-critical packages',
          command: 'npm update ' + securityPackages.map(p => p.name).join(' ')
        });
      }
      
      recommendations.push({
        priority: 'MEDIUM',
        action: 'Review and update outdated packages',
        command: 'npm update'
      });
    }
    
    return recommendations;
  }

  generateSummary(report) {
    const { summary, recommendations } = report;
    
    let summaryText = `Security Check Summary\n`;
    summaryText += `========================\n`;
    summaryText += `Generated: ${this.timestamp}\n\n`;
    
    summaryText += `🔍 Vulnerability Summary:\n`;
    summaryText += `  Total: ${summary.totalVulnerabilities}\n`;
    summaryText += `  Critical: ${summary.criticalVulnerabilities}\n`;
    summaryText += `  High: ${summary.highVulnerabilities}\n\n`;
    
    summaryText += `📦 Package Status:\n`;
    summaryText += `  Outdated packages: ${summary.outdatedPackagesCount}\n\n`;
    
    if (recommendations.length > 0) {
      summaryText += `🎯 Recommendations:\n`;
      recommendations.forEach((rec, index) => {
        summaryText += `  ${index + 1}. [${rec.priority}] ${rec.action}\n`;
        summaryText += `     Command: ${rec.command}\n`;
      });
    } else {
      summaryText += `✅ No immediate action required!\n`;
    }
    
    return summaryText;
  }

  async run() {
    try {
      this.log('🛡️ Starting security check...');
      
      // Run checks
      await this.checkVulnerabilities();
      await this.checkOutdatedPackages();
      
      // Generate report
      const report = await this.generateReport();
      
      // Print summary
      console.log('\n' + this.generateSummary(report));
      
      // Exit with appropriate code
      const hasHighSeverity = (this.vulnerabilities.critical || 0) + (this.vulnerabilities.high || 0) > 0;
      if (hasHighSeverity) {
        this.log('❌ Security check failed - critical or high vulnerabilities found', 'error');
        process.exit(1);
      } else {
        this.log('✅ Security check completed successfully');
        process.exit(0);
      }
      
    } catch (error) {
      this.log(`❌ Security check failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run the security check if this script is executed directly
if (require.main === module) {
  const checker = new SecurityChecker();
  checker.run();
}

module.exports = SecurityChecker;
