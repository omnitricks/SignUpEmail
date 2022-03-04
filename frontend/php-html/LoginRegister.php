<?php require_once '../php/controllers/authController.php'; ?>

<!DOCTYPE html>
<html>
<head>
	<title>Base</title>
	<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
	<link rel="stylesheet" href="../css/LoginRegisterstyle.css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700,800&display=swap" rel="stylesheet">
</head>
<body>
  <div class="cont">
    <div class="form sign-in">
	  <form action='LoginRegister.php' method='POST'>

      <?php if(count($errorslog)>0): ?>
        <div class = "alert alert-danger">
          <?php foreach($errorslog as $error): ?>
            <li><?php echo $error; ?></li>
          <?php endforeach; ?>
        </div>
      <?php else: ?>
        <h2 class="text-center">
          <?php echo "Sign In" ?>
        </h2>
      <?php endif; ?>


      <label>
        <span>Username or Email</span>
        <input type="text" value="<?php echo $username; ?>" name="username">
      </label>
      <label>
        <span>Password</span>
        <input type="password" name="password">
      </label>
      
	  <button type="submit" name="login-btn" class="submit">Sign In</button>
	  
    </form>
    <label>
      <a href="forgot_password.php" class="forgot-pass">Forgot Password ?</a>
    </label>
    </div>

    <div class="sub-cont">
    <div class="img">
        <div class="img-text m-up">
          <h2>New here?</h2>
          <p>Sign up and discover great amount of new opportunities!</p>
        </div>
        <div class="img-text m-in">
          <h2>One of us?</h2>
          <p>If you already has an account, just sign in. We've missed you!</p>
        </div>
        <div class="img-btn">
          <span class="m-up">Sign Up</span>
          <span class="m-in">Sign In</span>
        </div>
    </div>

    <div class="form sign-up">
      <form action='LoginRegister.php' method='POST'>
        
        <?php if(count($errorsregi)>0): ?>
          <div class = "alert alert-danger">
            <?php foreach($errorsregi as $error): ?>
              <li><?php echo $error; ?></li>
            <?php endforeach; ?>
          </div>
        <?php else: ?>
          <h3 class="text-center">
           <?php echo "Register" ?>
          </h3>
        <?php endif; ?>


        <label>
          <span>Username</span>
          <input type="text" value="<?php echo $usernameregi; ?>" name="username">
        </label>
        <label>
          <span>Email</span>
          <input type="text" value="<?php echo $email; ?>" name="email">
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password">
        </label>
        <label>
          <span>Confirm Password</span>
          <input type="password" name="cpassword">
        </label>

        <button type="submit" name="signup-btn" class="submit">Sign Up</button>
      </form>
   </div>
  </div>
<script src="../js/api-requests/util.js"></script>
<script src="../js/utils.js"></script>
<script src="../js/api-requests/api-client.js"></script>
<script src="../js/api-requests/api.js"></script> 
<script src="../js/api-requests/http-status-codes.js"></script>
<script src="../js/api-requests/api-client.js"></script>
<script type="text/javascript" src="../js/script.js"></script>
</body>
</html>