package selenium;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Test  {
    public static void main(String[] args) throws InterruptedException {
    	
    	
    	System.setProperty("webdriver.chrome.driver", "./driver/chromedriver");
    	
        WebDriver driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);    

        // And now use this to visit local-host 3000
        driver.navigate().to("http://localhost:3000");
        driver.manage().window().maximize();
        
        /***
         * 
         * successful sign up, goes to student register page
         */
        
        Thread.sleep(2000);
        
        // click signup
        driver.findElement(By.cssSelector("#root > div > form > div > input:nth-child(5)")).click();
        
        // put name on first name 
        WebElement firstName = driver.findElement(By.id("firstName"));
        firstName.sendKeys("TestFirstName");
        
        WebElement lastName = driver.findElement(By.id("lastName"));
        lastName.sendKeys("TestLastName");
        
        WebElement email = driver.findElement(By.id("email"));
        email.sendKeys("test@gmail.com");
        
        WebElement password = driver.findElement(By.id("password"));
        password.sendKeys("test123");
        
        // click drop-down menu 
        driver.findElement(By.cssSelector
    		   ("#root > div > form > div > div > div > div > div.css-g1d714-ValueContainer")).click();

        // for demo purpose
        Thread.sleep(2000);
        
        // click student 
        driver.findElement(By.xpath("//*[text()='Student']")).click();
        
        Thread.sleep(2000);
        
        // click register
        driver.findElement(By.cssSelector("#root > div > form > div > input[type=submit]")).click();
        
        Thread.sleep(4000);
        
        
        /***
         * 
         * sign up with invalid email (missing @) shows up error message
         */
        
        driver.navigate().to("http://localhost:3000");
        
        // click signup
        driver.findElement(By.cssSelector("#root > div > form > div > input:nth-child(5)")).click();
        
        // put name on first name 
        firstName = driver.findElement(By.id("firstName"));
        firstName.sendKeys("TestFirstName");
        
        lastName = driver.findElement(By.id("lastName"));
        lastName.sendKeys("TestLastName");
        
        email = driver.findElement(By.id("email"));
        email.sendKeys("test");
        
        password = driver.findElement(By.id("password"));
        password.sendKeys("test123");
        
        // click drop-down menu 
        driver.findElement(By.cssSelector
    		   ("#root > div > form > div > div > div > div > div.css-g1d714-ValueContainer")).click();

        // for demo purpose
        Thread.sleep(2000);
        
        // click student 
        driver.findElement(By.xpath("//*[text()='Student']")).click();
        
        Thread.sleep(2000);
        
        // click register
        driver.findElement(By.cssSelector("#root > div > form > div > input[type=submit]")).click();
        
        Thread.sleep(4000);
        
        
        /***
         * 
         * sign up with missing info, shows up error message
         */
        
        driver.navigate().to("http://localhost:3000");
        
        // click signup
        driver.findElement(By.cssSelector("#root > div > form > div > input:nth-child(5)")).click();
        
        // put name on first name 
        firstName = driver.findElement(By.id("firstName"));
        firstName.sendKeys("TestFirstName");
        
        lastName = driver.findElement(By.id("lastName"));
        lastName.sendKeys("TestLastName");

        // click drop-down menu 
        driver.findElement(By.cssSelector
    		   ("#root > div > form > div > div > div > div > div.css-g1d714-ValueContainer")).click();

        // for demo purpose
        Thread.sleep(2000);
        
        // click student 
        driver.findElement(By.xpath("//*[text()='Professor']")).click();
        
        Thread.sleep(2000);
        
        // click register
        driver.findElement(By.cssSelector("#root > div > form > div > input[type=submit]")).click();
        
        Thread.sleep(4000);
        
        
        /***
         * 
         * successful login, goes to dashboard
         */
        
        driver.navigate().to("http://localhost:3000");

        // put email
        email = driver.findElement(By.id("email"));
        email.sendKeys("gyohogo@sjsu.edu");
        
        // put password
        password = driver.findElement(By.id("password"));
        password.sendKeys("Milano123!");
        
        Thread.sleep(2000);
        
        // click login
        driver.findElement(By.cssSelector("#root > div > form > div > input:nth-child(4)")).click();
        
        Thread.sleep(4000);
        
        
        /***
         * 
         * login with invalid email, shows up error message
         */
        
        driver.navigate().to("http://localhost:3000");

        // put email
        email = driver.findElement(By.id("email"));
        email.sendKeys("testing");
        
        // put password
        password = driver.findElement(By.id("password"));
        password.sendKeys("Milano123!");
        
        // click login
        driver.findElement(By.cssSelector("#root > div > form > div > input:nth-child(4)")).click();
        
        Thread.sleep(4000);
        
        
        /***
         * 
         * login with wrong password, shows up error message
         */
        
        driver.navigate().to("http://localhost:3000");

        // put email
        email = driver.findElement(By.id("email"));
        email.sendKeys("gyohogo@sjsu.edu");
        
        // put password
        password = driver.findElement(By.id("password"));
        password.sendKeys("Milano!");
        
        Thread.sleep(2000);
        
        // click login
        driver.findElement(By.cssSelector("#root > div > form > div > input:nth-child(4)")).click();
        
        Thread.sleep(4000);
        
        
        /***
         * 
         * login with missing password, shows up error message
         */
        
        driver.navigate().to("http://localhost:3000");

        // put email
        email = driver.findElement(By.id("email"));
        email.sendKeys("gyohogo@sjsu.edu");
        
        Thread.sleep(4000);
        
        // click login
        driver.findElement(By.cssSelector("#root > div > form > div > input:nth-child(4)")).click();
        
        Thread.sleep(6000);
        
        /***
         * 
         * login with non existing email and missing info, shows up error message
         */
        
        driver.navigate().to("http://localhost:3000");

        // put email
        email = driver.findElement(By.id("email"));
        email.sendKeys("111@1111111");
        
        Thread.sleep(4000);
        
        // click login
        driver.findElement(By.cssSelector("#root > div > form > div > input:nth-child(4)")).click();
        
        Thread.sleep(6000);
       
        
        driver.quit();
    }
}

