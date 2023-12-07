# Salesperson_React

## Description

<p></p>

<p></p>

##### Components Used: 

    Settings Widget - User Interface to select configuration like expense account, paid account etc.
    Global Field - To store the Configuration which was selected through settings widget
    Connections -  To Get GlobalFields, Expense Accounts and paid through Accounts  and Update the GlobalFields 



## Prerequisites:

Make sure you have Node.js and npm (Node Package Manager) installed on your machine. You can download and install them from [Node.js website](https://nodejs.org/).
1. Create a Global Field in the developer portal and paste the field API name [here](https://github.com/zoho/zohofinance-SalespersonWidget-React/blob/04a4f75fe65d8e9241d45488f961fff0df46a792/salesperson-react-app/src/App.js#L10)
2. Create connections and paste the connnection_link_name [here](https://github.com/zoho/zohofinance-SalespersonWidget-React/blob/04a4f75fe65d8e9241d45488f961fff0df46a792/salesperson-react-app/src/App.js#L8).and also paste in [plugin-manifest.json](https://github.com/zoho/zohofinance-SalespersonWidget-React/blob/04a4f75fe65d8e9241d45488f961fff0df46a792/salesperson-settingWidget/plugin-manifest.json#L21) and ensure the scopes that you created in your developer portal

              
## Development Process of Salesperson Widget:
* Clone Repository
* You have two folders react app and settings Widget
* Run `npm install` in each folder
* In the React Folder, Run `npm run build`,  It builds the app for production to the `build` folder
* Copy the content from the 'build' folder and paste it into the 'app' folder of the 'SettingsWidget'. Before pasting the content, make sure to delete the existing content.
* In Setting Widget Folder, Run `zet pack`, zip will be generated under 'your_project/dist' 
* Upload the widget zip in the developer portal **configure tab**.
  
