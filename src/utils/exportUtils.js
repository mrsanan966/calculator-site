import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportToPDF = (data) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Mortgage Calculation Results', 20, 20);
  
  // Add summary
  doc.setFontSize(12);
  doc.text('Loan Summary:', 20, 40);
  
  const summaryData = [
    ['Monthly Payment', `$${data.monthlyPayment.toFixed(2)}`],
    ['Total Interest', `$${data.totalInterest.toFixed(2)}`],
    ['Loan Amount', `$${data.loanAmount.toFixed(2)}`],
    ['Total Payment', `$${data.totalPayment.toFixed(2)}`],
    ['Interest Rate', `${data.interestRate}%`],
    ['Loan Term', `${data.loanTerm} years`]
  ];
  
  doc.autoTable({
    startY: 45,
    head: [['Item', 'Value']],
    body: summaryData,
    theme: 'grid'
  });
  
  // Add amortization schedule
  doc.text('Amortization Schedule (First 12 Months):', 20, doc.lastAutoTable.finalY + 20);
  
  const scheduleData = data.amortizationSchedule.slice(0, 12).map(payment => [
    payment.month,
    `$${payment.payment.toFixed(2)}`,
    `$${payment.principalPayment.toFixed(2)}`,
    `$${payment.interestPayment.toFixed(2)}`,
    `$${payment.remainingBalance.toFixed(2)}`
  ]);
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 25,
    head: [['Month', 'Payment', 'Principal', 'Interest', 'Remaining Balance']],
    body: scheduleData,
    theme: 'grid'
  });
  
  // Save the PDF
  doc.save('mortgage-calculation.pdf');
};

export const exportToExcel = (data) => {
  // Create workbook
  const wb = XLSX.utils.book_new();
  
  // Summary sheet
  const summaryData = [
    ['Mortgage Calculation Summary'],
    [''],
    ['Item', 'Value'],
    ['Monthly Payment', `$${data.monthlyPayment.toFixed(2)}`],
    ['Total Interest', `$${data.totalInterest.toFixed(2)}`],
    ['Loan Amount', `$${data.loanAmount.toFixed(2)}`],
    ['Total Payment', `$${data.totalPayment.toFixed(2)}`],
    ['Interest Rate', `${data.interestRate}%`],
    ['Loan Term', `${data.loanTerm} years`]
  ];
  
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');
  
  // Amortization schedule sheet
  const scheduleData = [
    ['Month', 'Payment', 'Principal', 'Interest', 'Remaining Balance'],
    ...data.amortizationSchedule.map(payment => [
      payment.month,
      payment.payment.toFixed(2),
      payment.principalPayment.toFixed(2),
      payment.interestPayment.toFixed(2),
      payment.remainingBalance.toFixed(2)
    ])
  ];
  
  const scheduleSheet = XLSX.utils.aoa_to_sheet(scheduleData);
  XLSX.utils.book_append_sheet(wb, scheduleSheet, 'Amortization Schedule');
  
  // Save the Excel file
  XLSX.writeFile(wb, 'mortgage-calculation.xlsx');
};

export const printResults = (data) => {
  const printWindow = window.open('', '_blank');
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Mortgage Calculation Results</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f5f5f5; }
          h1, h2 { color: #333; }
        </style>
      </head>
      <body>
        <h1>Mortgage Calculation Results</h1>
        
        <h2>Loan Summary</h2>
        <table>
          <tr>
            <th>Item</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Monthly Payment</td>
            <td>$${data.monthlyPayment.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total Interest</td>
            <td>$${data.totalInterest.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Loan Amount</td>
            <td>$${data.loanAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total Payment</td>
            <td>$${data.totalPayment.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Interest Rate</td>
            <td>${data.interestRate}%</td>
          </tr>
          <tr>
            <td>Loan Term</td>
            <td>${data.loanTerm} years</td>
          </tr>
        </table>
        
        <h2>Amortization Schedule (First 12 Months)</h2>
        <table>
          <tr>
            <th>Month</th>
            <th>Payment</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Remaining Balance</th>
          </tr>
          ${data.amortizationSchedule.slice(0, 12).map(payment => `
            <tr>
              <td>${payment.month}</td>
              <td>$${payment.payment.toFixed(2)}</td>
              <td>$${payment.principalPayment.toFixed(2)}</td>
              <td>$${payment.interestPayment.toFixed(2)}</td>
              <td>$${payment.remainingBalance.toFixed(2)}</td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.print();
}; 