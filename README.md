How To Run The Express Project

1. Database
- In this project, I use MySQL. So please install XAMPP in your computer
- For the software, You can use HeidiSQL
- Open your local Database by activate XAMPP and open HeidiSQL
- Create database with the name of "wida"
- Export the wida.sql (included inside Express folder) to the wida database that you have been created
- Once exported, it should contain several example of data
   
2. Prepare the package
- Open Visual Studio Code
- Open the folder "Express" in Visual Studio Code
- Open terminal in Visual Studio Code
- please type "npm -v". If it doest show anything then you must install node first
- my npm version is 9.8.1
- If you have installed npm, then run in the terminal "npm install"
- The package that listed in package.json now installed

4. Run
- use "node app.js" to run the project
- the app run on localhost:9002
   
5. Use Postman
- Inside of Widatech folder there is Wida.postman_collection.json
- Please import it on your Postman Dekstop
- Now you can try to hit the endpoint
   
6. Upload File
- Inside of Widatech folder there is excel file named InvoiceImport.xlsx
- You can import it by hit the endpoint upload file and then change the value with that file  
