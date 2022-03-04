<?php require_once '../php/controllers/authController.php';


if(isset($_GET['token'])){
	$token = $_GET['token'];
	verifyUser($token);
}

if(isset($_GET['password-token'])){
	$passwordToken = $_GET['password-token'];
	resetPassword($passwordToken);
}

if(!isset($_SESSION['id'])){
	header('location: LoginRegister.php');
	exit();
}

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	<link rel="stylesheet" href="../css/Indexstyle.css">
	<title>Home</title>
</head>
<body>
	
	<div class="container">
		<div class="row">
			<div class="col-md-4 offset-md-4 form-div login">
			
			<?php if(isset($_SESSION['message'])): ?>
				<div class="alert <?php echo $_SESSION['alert-class']; ?>">
					<?php
						echo $_SESSION['message'];
						unset($_SESSION['message']);
						unset($_SESSION['alert-class']);
					?>
				</div>
			<?php endif ?>

				<h3>Welcome, <?php echo $_SESSION['username']; ?></h3>
				
				<a href="index.php?logout=1" class="logout"> logout</a>
				
				<?php if(!$_SESSION['verified']): ?>
					<div class="alert alert-warning">
					You need to verify your account.
					Sign in to your email account and click on the
					verification link we just emailed you at
					<strong><?php echo $_SESSION['email']; ?></strong>
					</div>
				<?php endif; ?>
				
				<?php if($_SESSION['verified']): ?>
					<a href="crud.php"><button class="btn btn-block btn-lg btn-primary">Go to Notes</button></a>
				<?php endif; ?>

			</div>
		</div>
	</div>
</body>
</html>