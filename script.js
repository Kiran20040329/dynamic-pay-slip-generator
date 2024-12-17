function generatePaySlip(event) {
  event.preventDefault();

  const companyName = document.getElementById('companyName').value;
  const employeeName = document.getElementById('employeeName').value;
  const employeeId = document.getElementById('employeeId').value;
  const payPeriod = document.getElementById('payPeriod').value;
  const ctc = parseFloat(document.getElementById('ctc').value);
  const unpaidLeavePercentage = parseFloat(document.getElementById('unpaidLeaves').value);

  // Calculate salary breakdown
  const basic = (50 / 100) * ctc;
  const hra = (20 / 100) * ctc;
  const incentive = (10 / 100) * ctc;
  const incomeTax = (5 / 100) * ctc;
  const providentFund = (10 / 100) * ctc;
  const unpaidLeaves = (unpaidLeavePercentage / 100) * ctc;

  const grossEarnings = basic + hra + incentive;
  const totalDeductions = incomeTax + providentFund + unpaidLeaves;
  const netPay = grossEarnings - totalDeductions;

  const newTab = window.open();
  newTab.document.write(`
    <html>
    <head>
      <title>Pay Slip</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 10px; border: 1px solid #ddd; }
        th { background: #f4f4f4; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Pay Slip for ${payPeriod}</h1>
        <table>
          <tr><th>Employee Name</th><td>${employeeName}</td><th>Employee ID</th><td>${employeeId}</td></tr>
          <tr><th>Pay Period</th><td>${payPeriod}</td><th>Pay Date</th><td>${new Date().toLocaleDateString("en-GB")}</td></tr>
        </table>
        <h2>Earnings and Deductions</h2>
        <table>
          <tr><th>Earnings</th><th>Amount</th><th>Deductions</th><th>Amount</th></tr>
          <tr><td>Basic Salary</td><td>${basic.toFixed(2)}</td><td>Income Tax</td><td>${incomeTax.toFixed(2)}</td></tr>
          <tr><td>HRA</td><td>${hra.toFixed(2)}</td><td>Provident Fund</td><td>${providentFund.toFixed(2)}</td></tr>
          <tr><td>Incentives</td><td>${incentive.toFixed(2)}</td><td>Unpaid Leaves</td><td>${unpaidLeaves.toFixed(2)}</td></tr>
          <tr><th>Gross Earnings</th><td>${grossEarnings.toFixed(2)}</td><th>Total Deductions</th><td>${totalDeductions.toFixed(2)}</td></tr>
          <tr><th>Net Pay</th><td colspan="3">${netPay.toFixed(2)}</td></tr>
        </table>
      </div>
    </body>
    </html>
  `);
}
