<?php require_once '../php/controllers/authController.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Forgot Password</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../css/Indexstyle.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">

</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-4 offset-md-4 form-div">
            <form action='forgot_password.php' method='POST'>
                <h3 class="text-center">Recover your password</h3>
                <p>
                    Please enter your email address you used to sign up on this site 
                    and we will assist you in recovering your password.
                </p>

                <?php if(count($errors)>0): ?>
                    <div class = "alert alert-danger">
                        <?php foreach($errors as $error): ?>
                        <li> <?php echo $error; ?></li>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>

                <div class="form-group">
                    <input type="email"  name="email" class="form-control form-control-lg">
                </div>
                
                <div class="form-group">
                    <button type="submit" name="forgot-password" class="btn btn-primary btn-block btn-lg">Recover your password</button>
                </div>

            </form>
        </div>
    </div>
</div>
</body>
</html>