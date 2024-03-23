exports.getMessage= (template) => {
    switch (template) {
      case "UNCAUGHT":
        return "Something went wrong. Please try again.";
      case "VALID_TOKEN":
        return "The token is valid.";
      case "EXPIRED_TOKEN":
        return "You have entered wrong or expired token. Please enter correct token";
      case "PASSWORD_NOT_MATCH":
        return "The password fields do not match.";
      case "USER_ACTIVATION":
        return "Your account has been activated successfully.Please login to add your first ward";
      case "ACTIVATION_LINK_EXPIRED":
        return "Your account activation link has been expired.";
      case "FORGET_LINK_SENT":
        return "The password reset link has been sent to your email successfully.";
      case "PASSWORD_CHANGED":
        return "Your password has been changed successfully.";
      case "OLD_PASSWORD_NOT_MATCHED":
        return "Your current password does not match.";
      case "USER_TOKEN_NOT_FOUND":
        return "Token is Invalid or expired.";
      case "USER_PASSCODE_NOT_FOUND":
          return "Pass Code is Invalid.";
      case "PASSWORD_LINK_EXPIRED":
        return "Your reset password link has been expired."; "";
    }
  }
