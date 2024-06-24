The project is created in NextJs.

Some of the functionalites of the platform:

- The toggle dark/light mode button toggles the code editor's theme.
  -Javascript is the language which is supported by the code editor.
  -You can click on run button to run the output of your code.
  -You will get the output of the code below the code editor.
  -When you click on submit button you will be redirected to submission successful page.

Steps to run the project:
-Install the dependencies with command 'npm install'
-Run the project with command 'npm run dev'

One of the solution code for the given question on the platform is:

function reverseString(str) {

    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;

}

const string = prompt('Enter a string: ');

const result = reverseString(string);
console.log(result);

Deployment Link: https://competitive-coding-website.vercel.app

In case you get any errors while trying to run the program, please contact me.
