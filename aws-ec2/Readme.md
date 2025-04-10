# AWS EC2

0. Create an instance on AWS using the Amazon Linux AMI

1. SSH into the EC2 instance with the generated key pair
![SSH](https://github.com/user-attachments/assets/43a5b020-2fe9-49ae-9c93-d618e704cf19)

2. Install nginx with
```
sudo yum update -y
sudo yum install nginx
```

3. Set nginx daemon to autostart:
```
sudo systemctl start nginx
sudo systemctl enable nginx
```

![NGINX](https://github.com/user-attachments/assets/c55a5d7c-2ac0-4a34-97cc-40282428d772)

4. Move my own ```index.html``` using ```scp``` and setup HTTP acces with AWS security groups
![MYNGINX](https://github.com/user-attachments/assets/f7260447-9a78-4231-865a-c59c71b97675)

5. Now theres a EC2 instance with my website!
