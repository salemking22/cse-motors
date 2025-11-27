function checkAccountType(req, res, next) {
  const account = res.locals.account;
  console.log("🔐 Checking account type:", account?.account_type);

  if (account && (account.account_type === 'Employee' || account.account_type === 'Admin')) {
    return next();
  }

  console.log("⚠️ Access restricted to employees and admins.");
  req.flash('notice', 'Access restricted to employees and admins.');
  res.redirect('/account/login');
}

module.exports = checkAccountType;