import {
	CognitoUserPool,
	CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'

const poolData = {
	UserPoolId: 'us-east-2_lzQqSD8AG',
	ClientId: '2hijdn9in123vtik40h50cgf41',
}

export const userPool = new CognitoUserPool(poolData)

export const signUp = async ({ email, password }, callback) => {
  const user = {
    username: email,
    email: email,
    password: password
  };

  const emailDataAttribute = {
    Name: 'email',
    Value: user.email
  };

  const attributeList = [];
  const attributeEmail = new CognitoUserAttribute(emailDataAttribute);
  
  attributeList.push(attributeEmail);
  userPool.signUp(user.username, user.password, attributeList, null, (err, result) => {
    callback({ err, result })
  })
}

export const confirmUser = ({ username, code }, callback) => {
  const userData = {
    Username: username,
    Pool: userPool,
  };
  
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.confirmRegistration(code, true, (err, result) => {
    callback({ err, result })
  });
}

export const resendCodeConfirmation = ({ username }, callback) => {
  const userData = {
    Username: username,
    Pool: userPool,
  };
  
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.resendConfirmationCode((err, result) => {
    callback({ err, result })
  });
}

export const signIn = async ({ username, password }, callback) => {
  console.log('signIn', { username, password }, callback)
  const authenticationData = {
    Username: username,
    Password: password,
  };
  console.log('signIn', 1)
  const authenticationDetails = new AuthenticationDetails(
    authenticationData
  );
  const userData = {
    Username: username,
    Pool: userPool,
  };
  console.log('signIn', 2)
  const cognitoUser = new CognitoUser(userData);
  console.log('signIn', 3)
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      console.log('signIn', 4)
      callback({ 
        result: {
          idToken: result.getIdToken().getJwtToken(),
          accessToken: result.getAccessToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
          userId: result.getIdToken().payload.sub,
        }
      })
    },
    onFailure: function(err) {
      console.log('signIn', 5)
      console.log('failure', err)
      callback({ err })
    },
    newPasswordRequired: function(challenge) {
      console.log('signIn', 5, challenge)
    },
  });
}

export const forgotPassword = ({ username }, callback) => {
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.forgotPassword({
    onSuccess: function(result) {
      callback(result)
    },
    onFailure: function(err) {
      callback({ err })
    }
  })
}

export const confirmForgotPassword = ({ username, verificationCode, newPassword }, callback) => {
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);
  console.log('confirmForgotPassword', username, verificationCode, newPassword)
  cognitoUser.confirmPassword(verificationCode, newPassword, {
    onSuccess: function(result) {
      callback(result)
    },
    onFailure: function(err) {
      console.log('failure', err)
      callback({ err })
    }
  })
}

export const getAuthenticatedUser = (callback) => {
  return userPool.getCurrentUser()
}

export const logout = () => {
  const user = getAuthenticatedUser()
  if (user) user.signOut()
}

export const isAuthenticated = callback => {
  const user = getAuthenticatedUser()
  if (!user) {
    return false
  } else {
    return user.getSession((err, session) => {
      if (err) {
        console.log('isAuthenticated ERROR: ', err)
        return false
      } else {
        if (session.isValid()) {
          return true
        } else {
          return false
        }
      }
    })
  }
}
