import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      type: 'input',
      message: "Enter a valid URL:",
      name: "URL",
    }
  ])

  .then((answers) => {
    const url = answers.URL;

    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qrcode.png"));
    console.log("✅ QR Code saved as 'qrcode.png'");

    fs.writeFile('URL.txt', url, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    }); 
  })

  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in this environment.");
    } else {
      console.error("Something went wrong:", error);
    }
  });
