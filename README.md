
# End to End Automation

### Overview  :computer:

Welcome :wave:

This is the end to end automation suite for Glen's Palocity QA Challenge!
The project uses:

[Protractor](https://www.protractortest.org/#/  "Protractor")
[Jasmine](https://jasmine.github.io/  "Jasmine")
[Typescript](https://www.typescriptlang.org/  "Typescript")

  
## Getting Set Up :hammer:
Before you go and start automating, you will first to set everything up! 

The e2e actually has it's own package.json, which means it's own node modules. You will need to go into the e2e folder to install and run these tests. 

So lets get starts with these Three Steps! 

#### Steps 1: The install: :wrench:

Just run:

`npm run npm i`

This command will install all the node modules.

#### Step 2: The setup: :floppy_disk:

After the install, you'll need to run this command **once** or only **after installing the node modules**

`npm run qa:setup`

This step will go out and get the drivers to run the browsers locally on your machine. 

#### Step 3: Running Tests: :runner:

Now that you have the node modules and driver's to run automation, you can now run the tests. If you want to run locally, **you will need to have your local server running**

**Local**

`npm run qa:local`

**Test**

`npm run qa:e2e`