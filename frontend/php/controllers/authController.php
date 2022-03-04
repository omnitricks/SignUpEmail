<?php

session_start();

require '../php/config/db.php';
require_once 'emailController.php';

$errors = array();
$errorslog = array();
$errorsregi = array();
$username = "";
$usernameregi = "";
$email = "";

if(isset($_POST['signup-btn'])){
    $usernameregi = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $cpassword = $_POST['cpassword'];

    if(empty($usernameregi)){
        $errorsregi['username'] = "Username required";
    }
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $errorsregi['email'] = "Email address is invalid";
    }
    if(empty($email)){
        $errorsregi['email'] = "Email required";
    }
    if(empty($password)){
        $errorsregi['password'] = "Password required";
    }

    if($password !== $cpassword){
        $errorsregi['password'] = "The two password do not match";
    }

    $emailQuery = "SELECT * From users WHERE email=? LIMIT 1";
    $stmt = $conn->prepare($emailQuery);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $userCount = $result->num_rows;
    $stmt->close();

    if($userCount > 0){
        $errorsregi['email'] = "Email already exists";
    }
    
    if(count($errorsregi) === 0){
        $password = password_hash($password, PASSWORD_DEFAULT);
        $token = bin2hex(random_bytes(50));
        $verified = false;

        $sql = "INSERT INTO users (username, email, verified, token, password) VALUES ( ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ssbss', $usernameregi, $email, $verified, $token, $password);
        
        if($stmt->execute()){
            $user_id = $conn->insert_id;
            $_SESSION['id'] = $user_id;
            $_SESSION['username'] = $usernameregi;
            $_SESSION['email'] = $email;
            $_SESSION['verified'] = $verified;

            sendVerificationEmail($email, $token);

            $_SESSION['message'] = "You are now logged in!";
            $_SESSION['alert-class'] = "alert-success";
            header('location: Index.php');
            exit();
        }else{
            $errorsregi['db_error'] = "Database error: failed to register";
        }

    }

}



if(isset($_POST['login-btn'])){
    $username = $_POST['username'];
    $password = $_POST['password'];

    if(empty($username)){
        $errorslog['username'] = "Username required";
    }
    if(empty($password)){
        $errorslog['password'] = "Password required";
    }

    if (count($errorslog) === 0){
        $sql = "SELECT * From users WHERE email=? OR username=? LIMIT 1";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ss', $username, $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
    
        if ($user != null){
            if(password_verify($password, $user['password'])){
        
                $_SESSION['id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['verified'] = $user['verified'];
        
                $_SESSION['message'] = "You are now logged in!";
                $_SESSION['alert-class'] = "alert-success";
                header('location: Index.php');
                exit();
            }else{
                $errorslog['login_fail'] = "Wrong Credentials";
            }
        }else{
            $errorslog['login_fail'] = "Wrong Credentials";
        }
    }

}



if(isset($_GET['logout'])){
    session_destroy();
    unset($_SESSION['id']);
    unset($_SESSION['username']);
    unset($_SESSION['email']);
    unset($_SESSION['verified']);
    header('location: LoginRegister.php');
    exit();
}





function verifyUser($token){
    global $conn;
    $sql = "SELECT * FROM users Where token='$token' LIMIT 1";
    $result = mysqli_query($conn, $sql);

    if(mysqli_num_rows($result) > 0){
        $user = mysqli_fetch_assoc($result);
        $update_query = "UPDATE users SET verified=1 Where token='$token'";

        if (mysqli_query($conn, $update_query)){
            $_SESSION['id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['verified'] = 1;

            $_SESSION['message'] = "Your email address was successfully verified!";
            $_SESSION['alert-class'] = "alert-success";
            header('location: Index.php');
            exit();
        }

    }else{
        echo 'User not found';
    }
}


    if(isset($_POST['forgot-password'])){
        $email = $_POST['email'];

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errors['email'] = "Email address is invalid";
        }
        if(empty($email)){
            $errors['email'] = "Email required";
        }

        if (count($errors) == 0) {
            $sql = "SELECT * FROM users Where email='$email' LIMIT 1";
            $result = mysqli_query($conn, $sql);
            $user = mysqli_fetch_assoc($result);
            $token = $user['token'];
            sendPasswordResetLink($email, $token);
            header('location: password_message.php');
            exit(0);
        }
    }

    if(isset($_POST['reset-password-btn'])) {
       $password = $_POST['password'];
       $cpassword = $_POST['cpassword'];

       if(empty($password) || empty($cpassword)){
            $errors['password'] = "Password required";
        }

        if($password !== $cpassword){
            $errors['password'] = "The two password do not match";
        }

        $password = password_hash($password, PASSWORD_DEFAULT);
        $email = $_SESSION['email'];

        if (count($errors) == 0) {
           $sql = "UPDATE users SET password='$password' Where email='$email'";
           $result = mysqli_query($conn, $sql);
           if($result){
               header('location: LoginRegister.php');
               exit(0);
           }
        }
    }

    function resetPassword($token){
        global $conn;
        $sql = "SELECT * FROM users Where token='$token' LIMIT 1";
        $result = mysqli_query($conn, $sql);
        $user = mysqli_fetch_assoc($result);
        $_SESSION['email'] = $user['email'];
        header('location: reset_password.php');
        exit(0);
    }
