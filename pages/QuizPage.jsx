import React, { useState, useEffect } from 'react';
import '../src/styles/App.css';
import { StudyQuestionCard } from '../components';
import { eastereggs } from '../src/assets/pictures';

const hardcodedQuestions = [
  {
    question: 'Which data source is supported by Power Apps?',
    image: null,
    choices: [
      { text: 'Azure SQL Database', isCorrect: true },
      { text: 'Oracle Database', isCorrect: false },
      { text: 'Salesforce', isCorrect: true },
      { text: 'GitHub', isCorrect: false },
    ],
    explanation: 'Power Apps supports multiple data sources like Azure SQL Database and Salesforce but not Oracle Database or GitHub.',
    explanationImage: null, // No image for this question
  },
  {
    question: 'What tool helps to automate workflows in Power Automate?',
    image: null,
    choices: [
      { text: 'Flow', isCorrect: true },
      { text: 'Logic Apps', isCorrect: false },
      { text: 'Power BI', isCorrect: false },
      { text: 'Teams', isCorrect: false },
    ],
    explanation: 'Flows in Power Automate help automate workflows across apps and services.',
    explanationImage: eastereggs,
  },
  {
    question: 'What is a key feature of Power BI?',
    image: null,
    choices: [
      { text: 'Data Visualization', isCorrect: true },
      { text: 'Custom Forms', isCorrect: false },
      { text: 'GitHub Integration', isCorrect: false },
      { text: 'App Development', isCorrect: false },
    ],
    explanation: 'Power BI is primarily used for data visualization and reporting.',
    explanationImage: null, // No image for this question
  },
  {
    question: 'A company manages capital equipment for an electric utility company...',
    image: null,
    choices: [
      { text: 'Add the maintenance history app to the Field Service Mobile app', isCorrect: false },
      { text: 'Add the manager Power BI dashboard to the Field Service mobile app', isCorrect: false },
      { text: 'Create a new maintenance canvas app from within the Power BI management dashboard', isCorrect: false },
      { text: 'Add the maintenance history app to the Power BI dashboard', isCorrect: true },
    ],
    explanation: 'Power BI is primarily used for data visualization and reporting.',
    explanationImage: null, // No image for this question
  },
  {
    question: 'A company has an application that provides API access. You plan to connect to the API from a canvas app by using a custom connector. You need to request information from the API developers so that you can create the custom connector. Which two types of files can you use? Each correct answer presents a complete solution. NOTE: Each correct selection is worth one point.',
    image: null,
    choices: [
      { text: 'YAML', isCorrect: false },
      { text: 'WSDL', isCorrect: false },
      { text: 'OpenAPI definition', isCorrect: true }, // Most Voted
      { text: 'Postman collection', isCorrect: true } // Most Voted
    ],
    explanation: 'You can use both OpenAPI definition and Postman collection files to define the API when creating a custom connector.',
    explanationImage: null,
  },
  {
    question: 'You plan to create a canvas app to manage large sets of records. Users will filter and sort the data. You must implement delegation in the canvas app to mitigate potential performance issues. You need to recommend data sources for the app. Which two data sources should you recommend? Each correct answer presents a complete solution. NOTE: Each correct selection is worth one point.',
    image: null,
    choices: [
      { text: 'SQL Server', isCorrect: true }, // Most Voted
      { text: 'Common Data Service', isCorrect: true }, // Most Voted
      { text: 'Azure Data Factory', isCorrect: false },
      { text: 'Azure Table Storage', isCorrect: false }
    ],
    explanation: 'SQL Server and Common Data Service are both supported data sources in Power Apps that support delegation to handle large sets of data efficiently.',
    explanationImage: null,
  },
  {
    question: 'A company plans to create an order processing app. When orders are created, the app will perform complex business logic and integrate with several external systems. Orders that have a large number of line items may take up to six minutes to complete. Processing for each order must be completed in one operation to avoid leaving records in an incomplete state. You need to recommend a solution for the company. What should you recommend?',
    image: null,
    choices: [
      { text: 'an asynchronous workflow that uses a custom workflow activity', isCorrect: false },
      { text: 'a real-time workflow that uses a custom action', isCorrect: false },
      { text: 'a webhook that connects to an Azure Function', isCorrect: true }, // Most Voted
      { text: 'an asynchronous plug-in', isCorrect: false }
    ],
    explanation: 'Using a webhook that connects to an Azure Function allows for scalable, reliable processing of large operations while avoiding incomplete states.',
    explanationImage: null,
  },
  {
    question: 'You are implementing custom business logic in a Power Apps portal. You need to use Liquid templates to display dynamic content. To which three entities can you include Liquid code? Each correct answer presents a complete solution. NOTE: Each correct selection is worth one point.',
    image: null,
    choices: [
      { text: 'Content snippet', isCorrect: true }, // Most Voted
      { text: 'Web page', isCorrect: true }, // Most Voted
      { text: 'Web template', isCorrect: true }, // Most Voted
      { text: 'Page template', isCorrect: false },
      { text: 'Portal settings', isCorrect: false }
    ],
    explanation: 'Liquid templates can be used within content snippets, web pages, and web templates to display dynamic content in Power Apps portals.',
    explanationImage: null,
  },
  {
    question: 'A company is migrating from an on-premises Dynamics 365 installation to a Power Platform solution. You are creating plug-ins for the new solution. You need to register the plug-ins. Which isolation mode should you use?',
    image: null,
    choices: [
      { text: 'None', isCorrect: false },
      { text: 'Global Assembly Cache (GAC)', isCorrect: false },
      { text: 'Sandbox', isCorrect: true }, // Most Voted
      { text: 'Disk', isCorrect: false }
    ],
    explanation: 'The Sandbox isolation mode is used for plug-ins in the cloud environment because it provides additional security by running the code in a restricted environment.',
    explanationImage: null,
  },
  {
    question: 'An organization uses a public-facing Power Apps portal. You need to change the layout of a specific web page. What are two possible ways to achieve the goal? Each correct answer presents a complete solution.',
    image: null,
    choices: [
      { text: 'Select the Portal Management app and then select Edit.', isCorrect: true },
      { text: 'Select the Portal Management app and then select Play.', isCorrect: false }, // Most Voted
      { text: 'Select the portal app and then select Manage.', isCorrect: false },
      { text: 'Select the portal app and then select Edit.', isCorrect: true } // Most Voted
    ],
    explanation: 'You can use either the Portal Management app to directly edit the page layout or the portal app’s Edit option to modify the web page design.',
    explanationImage: null,
  },
  {
    question: 'You are building a custom application in Azure to process resumes for the HR department. The app will monitor submissions of resumes and parse the resumes. You need to parse the resumes and save contact and skills information into the Common Data Service. Which mechanism should you use?',
    image: null,
    choices: [
      { text: 'Power Automate', isCorrect: true }, // Most Voted
      { text: 'Common Data Service plug-in', isCorrect: false },
      { text: 'Web API', isCorrect: false },
      { text: 'Custom workflow activity', isCorrect: false }
    ],
    explanation: 'Power Automate is used to automate workflows and can be set up to monitor and parse data submissions, integrating with Common Data Service to save the parsed information.',
    explanationImage: null,
  },
  {
    question: 'A Power Platform solution includes the following Web API call: GET http://contoso.crm.dynamics.com/api/data/v9.1/RelationshipDefinitions?$select=SchemaName. You need to explain what this line of code is doing. What does the code do?',
    image: null,
    choices: [
      { text: 'Retrieve the list of relationships between tables.', isCorrect: true }, // Most Voted
      { text: 'Retrieve a list of tables that are related to each other.', isCorrect: false },
      { text: 'Retrieve a list of one-to-many relationships with other tables.', isCorrect: false },
      { text: 'Retrieve a list of tables that have more than one relationship.', isCorrect: false },
      { text: 'Retrieve a list of many-to-many relationships with other tables.', isCorrect: false }
    ],
    explanation: 'The API call retrieves the schema names of relationship definitions between tables, which includes various types of table relationships in the Dataverse.',
    explanationImage: null,
  },
  {
    question: 'You are creating a canvas app to retrieve user sign-in information from Microsoft Azure Active Directory (Azure AD) when someone searches for information about an end user. You create an Azure Function to retrieve the required information by using JSON. You need to ensure that the application functions correctly. Which two actions should you perform? Each correct answer presents part of the solution.',
    image: null,
    choices: [
      { text: 'Create a Power Automate flow to import data.', isCorrect: false },
      { text: 'Create a custom connector by using the Azure Function API.', isCorrect: true }, // Most Voted
      { text: 'Use app designer in the Power Platform admin center.', isCorrect: false },
      { text: 'Use Azure Service Bus.', isCorrect: false },
      { text: 'Create an API definition for the Azure Function.', isCorrect: true } // Most Voted
    ],
    explanation: 'Creating a custom connector and an API definition for the Azure Function allows the canvas app to call the Azure AD function and retrieve sign-in data correctly.',
    explanationImage: null,
  },
  {
    question: 'You are configuring a custom connector for a web service. The web service is hosted in two different regions. The web service URL includes a common domain name and a unique sub-domain for each region. The custom connector must allow the region to be entered for additional regions when creating the connection. You need to create a policy template. Which template type should you use?',
    image: null,
    choices: [
      { text: 'Set HTTP header', isCorrect: false },
      { text: 'Route request', isCorrect: false },
      { text: 'Set host URL', isCorrect: true }, // Most Voted
      { text: 'Set query string parameter', isCorrect: false }
    ],
    explanation: 'The "Set host URL" template allows for dynamic entry of subdomains for different regions when configuring the custom connector.',
    explanationImage: null,
  },
  {
    question: 'You are a Power Apps maker creating a chat bot for a website. The chat bot must recognize geographic attributes to enable additional functionality. You need to recommend a feature. What should you recommend?',
    image: null,
    choices: [
      { text: 'Fallback topic', isCorrect: false },
      { text: 'Power Automate Flow', isCorrect: false },
      { text: 'Bot Service compliance', isCorrect: false },
      { text: 'Slot filling', isCorrect: true } // Most Voted
    ],
    explanation: 'Slot filling enables the bot to collect specific pieces of information, such as geographic attributes, in order to trigger related functionality within the bot.',
    explanationImage: null,
  },
  {
    question: 'You develop and deploy a Power Apps solution. The following changes must be made to the solution: • Delete a column of data. • Modify several views. • Add several charts to dashboards. You need to re-deploy the app. What should you do?',
    image: null,
    choices: [
      { text: 'Update the solution.', isCorrect: false },
      { text: 'Upgrade the solution.', isCorrect: true }, // Most Voted
      { text: 'Create a new solution.', isCorrect: false },
      { text: 'Patch the solution.', isCorrect: false }
    ],
    explanation: 'Upgrading the solution will allow you to deploy changes to the solution, including modifications to views and dashboards, while preserving existing configurations.',
    explanationImage: null,
  },
  {
    question: 'You develop a model-driven app. You add the following users as members to the Sales Microsoft Azure Active Directory (Azure AD) security group: User1, User2, and User3. The Sales Azure AD security group is linked to a pre-existing Microsoft Dataverse Azure AD security group team that is associated with the Sales security role. You assign each of the appropriate licenses to each user. User1 is not listed in the Team Members subgrid for the app. User2 and User3 are listed in the subgrid. You need to ensure that User1 can use the model-driven app. What should you do?',
    image: null,
    choices: [
      { text: 'Change the membership of the Sales Azure AD Security group to Dynamic User.', isCorrect: false },
      { text: 'Change the membership type for User1 to Owner in the Azure AD security group.', isCorrect: false },
      { text: 'Create an Owner team for the members of the Sales Azure AD group.', isCorrect: false },
      { text: 'Ask User1 to sign into the model-driven app.', isCorrect: true } // Most Voted
    ],
    explanation: 'User1 must sign into the model-driven app at least once to be listed as a member in the Team Members subgrid, as users need to authenticate to be visible.',
    explanationImage: null,
  },
  {
    question: 'A company develops a new Microsoft Dataverse plug-in that manages the Update message of an entity. The plug-in logic requires access to the record columns before the operation starts and must compare the columns to post-update values. You need to modify the design of the solution to access the information. What should you do?',
    image: null,
    choices: [
      { text: 'Add the code to the plug-in to read the record from the InputParameters collection.', isCorrect: false },
      { text: 'Register a pre-image by using the Plug-in Registration Tool. Add the code to the plug-in to read the image from the PreEntityImages collection.', isCorrect: true },
      { text: 'Register a post-image by using the Plug-in Registration Tool. Add the code to the plug-in to read the image from the PostEntityImages collection.', isCorrect: false },
      { text: 'Add the code to the plug-in to query the data from Dataverse by using the API call based on the record ID.', isCorrect: false },
    ],
    explanation: 'To access the record columns before the operation starts, a pre-image must be registered using the Plug-in Registration Tool, allowing the plug-in to read the information from the PreEntityImages collection.',
    explanationImage: null,
  },
  {
    question: 'A company designs a Microsoft Dataverse Custom API to encapsulate business logic in it. The Custom API business logic must be encapsulated in a way that does not allow the business logic behavior to be modified or canceled. You need to set the parameter value of the custom API so it cannot be customized. Which parameter value should you set?',
    image: null,
    choices: [
      { text: 'Execute Privilege Name to prv_SdkMessageProcessingStep', isCorrect: false },
      { text: 'Enabled for Workflow to No', isCorrect: false },
      { text: 'Binding Type to Entity', isCorrect: false },
      { text: 'Custom Processing Step to None', isCorrect: true },
    ],
    explanation: 'To prevent the business logic behavior from being modified or canceled, setting the Custom Processing Step to None ensures that the logic remains encapsulated without being overridden.',
    explanationImage: null,
  },
  {
    question: 'A company has a model-driven app form. Many users use the form. Users state that the form takes too long to fully load. You need to evaluate the form design to improve loading performance. Which three control types can you use? Each correct answer presents a complete solution.',
    image: null,
    choices: [
      { text: 'timeline', isCorrect: false },
      { text: 'quick view form', isCorrect: true },
      { text: 'iFrame', isCorrect: true },
      { text: 'lookup', isCorrect: true },
    ],
    explanation: 'To improve loading performance, the quick view form, iFrame, and lookup control types are typically optimized for better performance compared to other more complex controls.',
    explanationImage: null,
  },
  {
    question: 'A financial institution that has a Dynamics 365 Sales environment requires that the account balance field from the account entity be visible to specific users only. You need to set up the field security for the account balance field. Which three actions should you perform? Each correct answer presents part of the solution.',
    image: null,
    choices: [
      { text: 'Set the field to Read-Only and then publish the entity', isCorrect: false },
      { text: 'Set the field permission Allow Read to Yes and add the users to the members section', isCorrect: true },
      { text: 'Create a security role and add the specific users to the role', isCorrect: false },
      { text: 'Enable field security and then publish the entity', isCorrect: true },
      { text: 'Create a field security profile', isCorrect: true },
    ],
    explanation: 'To secure the account balance field, enabling field security, publishing the entity, and creating a field security profile with appropriate permissions and members ensures that only specific users can view it.',
    explanationImage: null,
  },
  {
    question: 'You are creating a new page for a Power Apps portal. You need to display data from Microsoft Dataverse on the page. What should you use?',
    image: null,
    choices: [
      { text: 'Liquid', isCorrect: true },
      { text: 'CSS', isCorrect: false },
      { text: 'iFrame', isCorrect: false },
      { text: 'Bootstrap', isCorrect: false },
    ],
    explanation: 'Liquid is the most appropriate method to display data from Microsoft Dataverse on a Power Apps portal page as it allows dynamic content rendering.',
    explanationImage: null,
  },
  {
    question: 'A financial services company uses the Common Data Service (CDS) to develop solutions. The company uses development and production instances. You need to move solutions from the development instance to the production instance. What are two possible ways to achieve this goal?',
    image: null,
    choices: [
      { text: 'In the development instance, make changes to the solutions that are deployed in the production instance, export the solutions as managed solutions, and import the managed solutions into the production instance.', isCorrect: true },
      { text: 'In the development instance, highlight the solution you want to make changes to, select Clone a Patch, make changes, export the solution, and import the solution into the production instance.', isCorrect: true },
      { text: 'Export all managed solutions from the development instance and import the solutions into the production instance.', isCorrect: false },
      { text: 'In the production instance, import solutions with the same version number or higher when updating solutions.', isCorrect: false },
    ],
    explanation: 'To move solutions from development to production, you can either export solutions as managed from development or clone a patch, make changes, and then import them into production.',
    explanationImage: null,
  },
  {
    question: 'You are developing a model-driven app. The app uses data from two custom tables. The tables have a parent-child relationship. The parent record form contains a subgrid that displays the child records. When creating a new child record from the parent form, data must automatically populate in the child record form to reduce data input errors. You need to implement the solution. What should you do?',
    image: null,
    choices: [
      { text: 'Use a Power Automate flow to read data from the parent record and update the child record upon creation.', isCorrect: false },
      { text: 'Map table columns from the parent record to the child record.', isCorrect: true },
      { text: 'Create a business rule that sets the default values on the child record fields to values from the parent record.', isCorrect: false },
      { text: 'Include a quick view form on the child record showing the data from the parent record.', isCorrect: false },
    ],
    explanation: 'Mapping table columns between parent and child records ensures data is automatically populated to avoid errors during child record creation.',
    explanationImage: null,
  },
  {
    question: 'You are developing a Power Platform solution for a medical practice. You create a custom table named Doctors to record details about the doctors who work at the medical practice. You must be able to attach a PDF copy of a doctor\'s medical license to the row for each doctor. You need to configure the table. What should you do?',
    image: null,
    choices: [
      { text: 'Create a Power Automate flow to add attachments.', isCorrect: false },
      { text: 'Navigate to Table options and enable attachments.', isCorrect: true },
      { text: 'Navigate to Column options and enable attachments.', isCorrect: false },
      { text: 'Create relationships between the Doctor table and the Notes table.', isCorrect: false },
    ],
    explanation: 'Enabling attachments at the table level allows you to store PDFs or other files directly within the Doctors table.',
    explanationImage: null,
  },
  {
    question: 'You plan to populate records in a Microsoft Dataverse entity containing an option set field. The source system has the label for the option set but not the corresponding integer value. You are using a non .NET programming language. You need to find the integer value for the option set. What should you do?',
    image: null,
    choices: [
      { text: 'Use Web API and use a PicklistAttibuteMetadata request.', isCorrect: true },
      { text: 'Use the Organization service and execute a RetrieveOptionSetRequest request.', isCorrect: false },
      { text: 'Use Web API and use an InsertOptionValue action.', isCorrect: false },
      { text: 'Use the Organization service and execute a RetrieveAttributeRequest request.', isCorrect: false },
    ],
    explanation: 'Using the Web API with a PicklistAttributeMetadata request retrieves the integer values for the option set when working with non-.NET languages.',
    explanationImage: null,
  },
  {
    question: 'A travel company has a Common Data Service (CDS) environment. The company requires the following: Custom entities that track which regions clients have traveled, and the dates their clients traveled to these regions. You need to create the entities and relationships to meet the requirements. Which three actions should you perform?',
    image: null,
    choices: [
      { text: 'Create a N:N relationship from Contact to the Region entity.', isCorrect: false },
      { text: 'Create a 1:N relationship from the ContactRegion intersect entity and Region.', isCorrect: true },
      { text: 'Create an intersect entity named ContactRegion and create 1:N relationships to Contact and Region.', isCorrect: true },
      { text: 'On the main form for ContactRegion, add lookup fields for Contact and Region, and a date field for the visit date.', isCorrect: true },
      { text: 'Create a 1:N relationship from Contact to the Region entity.', isCorrect: false },
      { text: 'Create the Region entity.', isCorrect: true },
      { text: 'On the main form for ContactRegion, add a sub-grid to view country information.', isCorrect: false },
      { text: 'Create an intersect entity named ContactRegion and create N:1 relationships to Contact and Region.', isCorrect: false },
    ],
    explanation: 'To track regions and travel dates, create an intersect entity for ContactRegion with appropriate 1:N relationships and lookup fields on the form for ease of use.',
    explanationImage: null,
  },
  {
    question: 'A company uses Common Data Service rollup fields to calculate insurance exposure and risk profiles for customers. Users report that the system does not update values for the rollup fields when new insurance policies are written. You need to recalculate the value of the rollup fields immediately after a policy is created. What should you do?',
    image: null,
    choices: [
      { text: 'Create new fields on the customer entity for insurance exposure and risk. Write a workflow process that is triggered when a new policy record is created to calculate the sum of values from policy records.', isCorrect: false },
      { text: 'Update the Mass Calculate Rollup Field job to trigger when a new policy record is created.', isCorrect: false },
      { text: 'Change the frequency of the Calculate Rollup Field recurring job from every hour to every five minutes.', isCorrect: false },
      { text: 'Create a plug-in that uses the CalculateRollupFieldRequest method for the rollup field. Configure a step on the Create event for the policy entity for this plug-in.', isCorrect: true },
    ],
    explanation: 'To ensure rollup fields are recalculated immediately, a plug-in can trigger the CalculateRollupFieldRequest method when a new policy is created.',
    explanationImage: null,
  },
  {
    question: 'The communication department for a company plans to add a publicly accessible survey page to the company\'s public website. You must add the new survey page to the company\'s public website and capture data from the page to a Microsoft Dataverse environment. Explicit user credentials must not be required to write survey data to Dataverse. You need to implement authentication. Which authentication mechanism should you implement?',
    image: null,
    choices: [
      { text: 'ADFS', isCorrect: false },
      { text: 'Azure AD Conditional Access', isCorrect: false },
      { text: 'Azure guest account', isCorrect: false },
      { text: 'Client secret', isCorrect: true },
    ],
    explanation: 'A client secret allows access to Dataverse without requiring explicit user credentials, making it ideal for capturing survey data.',
    explanationImage: null,
  },
  {
    question: 'You are a Power App maker. You are developing an app in a development environment. You create the following custom forms in the Account entity: FormB contains a message that appears in the OnLoad function of the form. FormC contains a message that appears in the OnSave function of the form. You add the forms to a solution and export the solution as managed. Importing the managed solution into the test environment produces an error indicating the solution is missing a component. You need to identify the issue. What is the cause of the import error?',
    image: null,
    choices: [
      { text: 'The web resources were not added to the form before adding the form to the solution.', isCorrect: false },
      { text: 'The solution must be exported as an unmanaged solution.', isCorrect: false },
      { text: 'The web resources were not added to the solution before exporting.', isCorrect: true },
      { text: 'A copy of the form must be made before adding to the solution.', isCorrect: false },
    ],
    explanation: 'Web resources must be added to the solution before exporting, as missing components can cause import errors in the target environment.',
    explanationImage: null,
  },
  {
    question: 'You are developing a model-driven app for a company. The app must map child records to a parent record. You need to use the column mapping feature to configure the app. Which two actions can you perform?',
    image: null,
    choices: [
      { text: 'Map the value of a Choices column on the child table to the value of a Choices column on the parent table.', isCorrect: true },
      { text: 'Map the value of a column on the parent table that uses column values from the child table.', isCorrect: false },
      { text: 'Map the value of columns on both the child table quick-create and main forms to the value for the same columns on the parent table.', isCorrect: true },
      { text: 'Map the value of a single line of text column on the child table to the value of a currency column on the parent record.', isCorrect: false },
    ],
    explanation: 'Column mapping can be used between child and parent records for fields with matching data types, ensuring that data is consistent when creating or editing records.',
    explanationImage: null,
  },
  {
    question: 'You are mapping data from an enterprise resource planning (ERP) system to Microsoft Dataverse. You must reference the Name and Email from the ERP system during mapping to ensure that records are unique. You need to create an alternate key that references the Name and Email columns. How should you create the key?',
    image: null,
    choices: [
      { text: 'Add a Power Apps command function.', isCorrect: false },
      { text: 'Use Power Fx.', isCorrect: false },
      { text: 'Add column to the Account table in Dataverse.', isCorrect: false },
      { text: 'Create a key in the Account table in Dataverse.', isCorrect: true },
    ],
    explanation: 'To ensure records are unique, creating an alternate key on the Account table in Dataverse using the Name and Email columns allows for accurate data mapping.',
    explanationImage: null,
  },
  {
    question: 'You develop a model-driven app to include a form containing several columns. Two groups of users, named Group1 and Group2, will access the form. A column contains sensitive data that should not be read by Group2. Group1 must be able to access the column. You need to prevent Group2 users from viewing the sensitive data. What should you do?',
    image: null,
    choices: [
      { text: 'Create a security role for users in Group1 to grant users access to the column.', isCorrect: false },
      { text: 'Create multiple forms. Assign a form containing the sensitive data to Group1. Assign a form that does not contain the sensitive data to Group2.', isCorrect: true },
      { text: 'Use JavaScript to set visibility of the column based on the group of the current user.', isCorrect: false },
      { text: 'Create a field-level security profile for Group1 users to grant the users access to the column.', isCorrect: false },
    ],
    explanation: 'Creating multiple forms and assigning them based on group ensures Group1 can access the sensitive data while Group2 cannot.',
    explanationImage: null,
  },
  {
    question: 'You are developing a Power Apps app to manage records in the Account table in Microsoft Dataverse. You must configure a Web API request to retrieve changes from the table. You need to configure the preference header for the API request. What should you include in the request header?',
    image: null,
    choices: [
      { text: 'odata.nextLink', isCorrect: false },
      { text: 'odata.context', isCorrect: false },
      { text: 'odata.deltaLink', isCorrect: true },
    ],
    explanation: 'The "odata.deltaLink" header is used to retrieve changes from a Dataverse table by tracking data modifications.',
    explanationImage: null,
  },
  {
    question: 'You enable change tracking on the Account table in Microsoft Dataverse. You plan to use the Organization Service to retrieve the delta data by using C#. You need to determine which message to use. What should you use?',
    image: null,
    choices: [
      { text: 'RetrieveAttributeRequest', isCorrect: false },
      { text: 'odata.track-changes', isCorrect: false },
      { text: 'RetrieveEntityChangesRequest', isCorrect: true },
      { text: 'UpdateEntityRequest', isCorrect: false },
      { text: 'UpdateRequest', isCorrect: false },
    ],
    explanation: 'The "RetrieveEntityChangesRequest" message is used in the Organization Service to retrieve delta data when change tracking is enabled.',
    explanationImage: null,
  },
  {
    question: 'A Microsoft Dataverse database contains two custom tables named TableA and TableB. The tables are configured with the following: A one-to-many relationship is configured between TableA and TableB. A lookup to TableA appears on a form in TableB. Both tables are components of an unmanaged solution. Both tables are components in a Power BI report. You receive an error when attempting to delete TableA. You need to delete the table. What should you do?',
    image: null,
    choices: [
      { text: 'Remove TableA from the Power BI report.', isCorrect: false },
      { text: 'Remove the relationship between TableA and TableB.', isCorrect: true },
      { text: 'Remove TableA from the unmanaged solution.', isCorrect: false },
      { text: 'Remove the lookup field to TableA on the TableB form.', isCorrect: false },
    ],
    explanation: 'You need to remove the relationship between TableA and TableB before deleting TableA to resolve the dependency error.',
    explanationImage: null,
  },
  {
    question: 'A company uses Microsoft Dataverse rollup fields to calculate insurance exposure and risk profiles for customers. Users report that the system does not update values for the rollup fields when new insurance policies are written. You need to recalculate the value of the rollup fields immediately after a policy is created. What should you do?',
    image: null,
    choices: [
      { text: 'Create new fields on the customer entity for insurance exposure and risk. Write a workflow process that is triggered when a new policy record is created to calculate the sum of values from policy records.', isCorrect: false },
      { text: 'Update the Mass Calculate Rollup Field job to trigger when a new policy record is created.', isCorrect: false },
      { text: 'Create new calculated fields on the customer entity for insurance exposure and risk. Create a formula to calculate the sum of values from policy records.', isCorrect: false },
      { text: 'Create a plug-in that uses the CalculateRollupFieldRequest method for the rollup field. Configure a step on the Create event for the policy entity for this plug-in.', isCorrect: true },
    ],
    explanation: 'A plug-in with the CalculateRollupFieldRequest method ensures that the rollup fields are recalculated immediately after the creation of a policy.',
    explanationImage: null,
  },
  {
    question: 'A company designs a solution that contains a new real-time workflow. The workflow populates a lookup column that has a default value. A managed solution is imported to the test environment. An error occurs when a test engineer attempts to create a record. The error message states, "Record is not available." You need to resolve the error. What should you do?',
    image: null,
    choices: [
      { text: 'Add missing lookup table records to the solution.', isCorrect: false },
      { text: 'Go to the test environment and manually create missing lookup table records.', isCorrect: false },
      { text: 'Use the Configuration Migration Tool to extract the lookup table data from the development environment and import it to the test environment.', isCorrect: true },
    ],
    explanation: 'The Configuration Migration Tool is used to transfer lookup table records from one environment to another, which resolves the missing record error.',
    explanationImage: null,
  },
  {
    question: 'Which permissions does a managed identity have on Microsoft Dataverse data?',
    image: null,
    choices: [
      { text: 'permissions assigned to the corresponding application user', isCorrect: true },
      { text: 'permissions assigned to the user triggering the Azure resource', isCorrect: false },
      { text: 'permissions equivalent to the environment admin role', isCorrect: false },
      { text: 'permissions equivalent to the system administrator role', isCorrect: false },
    ],
    explanation: 'A managed identity in Dataverse has the permissions assigned to the corresponding application user, allowing access according to the role assigned to that user.',
    explanationImage: null,
  },
  {
    question: 'You create a model-driven app. You run Solution checker. The tool displays the following error: Solution checker fails to export solutions with model-driven app components. You need to resolve the issue. What should you do?',
    image: null,
    choices: [
      { text: 'Manually export the solution before running Solution checker', isCorrect: false },
      { text: 'Assign the Environment Maker security role to the Power Apps Checker application user', isCorrect: true },
      { text: 'Assign the System Administrator security role to your user ID', isCorrect: false },
      { text: 'Disable the Power Apps Checker application user', isCorrect: false },
      { text: 'Assign the Environment Maker security role to your user ID', isCorrect: false },
    ],
    explanation: 'Assigning the Environment Maker security role to the Power Apps Checker application user resolves the issue of failing to export solutions with model-driven app components.',
    explanationImage: null,
  },
  {
    question: 'A company uses a model-driven app to record details of laboratory tests. You are asked to create a custom component that makes it easier to capture multiple values from lab test results on mobile devices. You need to create the interface for the dataset in case the mobile devices lose connection to the network. Which method should you use?',
    image: null,
    choices: [
      { text: 'SaveData', isCorrect: false },
      { text: 'updateView', isCorrect: true },
      { text: 'init', isCorrect: false },
      { text: 'getClient', isCorrect: false },
    ],
    explanation: 'The updateView method ensures that the dataset is updated, even if the mobile devices lose connection to the network.',
    explanationImage: null,
  },
  {
    question: 'You deploy a Power Platform plug-in to a production environment. The plug-in code contains detailed tracing information. You are a member of the Environment Maker security role for the environment. Users report unexpected results when they interact with confidential data by using the plug-in. You confirm that the plug-in works without errors in a development environment. You need to investigate the root cause of the plug-in errors. What should you do?',
    image: null,
    choices: [
      { text: 'Send a PUT request to enable plug-in tracing for the production environment.', isCorrect: false },
      { text: 'Send a GET request to retrieve the plugintracelogs records.', isCorrect: true },
      { text: 'Install Plug-in profiler in the production environment by using the Plug-in Registration tool.', isCorrect: false },
      { text: 'Reproduce and capture the errors, then debug from Visual Studio.', isCorrect: false },
    ],
    explanation: 'Retrieving plugintracelogs with a GET request allows investigation into the specific errors encountered by users.',
    explanationImage: null,
  },
  {
    question: 'You fix a bug in the code of your application, which is currently on version 10.0.2.1. You need to publish an updated version of the solution. Which version identifier should you use?',
    image: null,
    choices: [
      { text: '10.0.3.1', isCorrect: true },
      { text: '10.0.2.2', isCorrect: false },
      { text: '10.1.0.2', isCorrect: false },
      { text: '11.0.0', isCorrect: false },
    ],
    explanation: 'Incrementing the third digit (patch) indicates a minor fix, so the correct version is 10.0.3.1.',
    explanationImage: null,
  },
  {
    question: 'An organization uses Dynamics 365 Sales. The organization has accounting and customer service departments. You must restrict users in customer service from being able to change the value of the balance field on the Contact records. The accounting team must be the only team able to edit this field. You need to create the appropriate solution without any customizations. What should you do first?',
    image: null,
    choices: [
      { text: 'Enable field security for the balance field and grant the customer service team read and update permissions.', isCorrect: false },
      { text: 'Create a customer service form and role and make the balance field read-only.', isCorrect: false },
      { text: 'Enable field security for the balance field and grant the accounting team read and update permissions.', isCorrect: true },
      { text: 'Create an accounting form and role and make the balance field read-only.', isCorrect: false },
    ],
    explanation: 'Enabling field security and granting appropriate permissions to the accounting team restricts edits to the balance field.',
    explanationImage: null,
  },
  {
    question: 'A travel company plans to track the address of places their clients visit in an entity named Destination. Client information is captured as contact records. Client records include links to the places that clients visit. The company must be able to link multiple rating records to the new address record. You find a custom Rating entity that is incomplete. You need to expand the Rating entity to include contact, address, and rating information in one place. Which three actions should you perform?',
    image: null,
    choices: [
      { text: 'Create a 1:N relationship between the Contact system entity and the Address system entity named Destination.', isCorrect: false },
      { text: 'Create a mapping for the Contact – Rating relationship.', isCorrect: false },
      { text: 'Create a 1:N relationship between the Address system entity and the Rating entity.', isCorrect: true },
      { text: 'Create a 1:N relationship between the Contact system entity and the Rating entity.', isCorrect: false },
      { text: 'Create a mapping for the Destination – Rating relationship.', isCorrect: true },
      { text: 'Create a 1:N relationship between the Destination entity and the Rating entity.', isCorrect: true },
    ],
    explanation: 'The correct actions involve establishing relationships and mappings between the entities to ensure that ratings, addresses, and contacts are properly linked.',
    explanationImage: null,
  },
  {
    question: 'A bank uses a Common Data Service solution to manage clients. Bank representatives perform client credit checks while the client is present. Credit checks may take up to five minutes to complete. Bank policy dictates that the bank representative\'s app must stay blocked until credit checks are complete. You need to display a model-driven app while credit checks run to ask the bank representative and client to wait for the credit check to complete. Which function should you use?',
    image: null,
    choices: [
      { text: 'Xrm.Navigation.openWebResource("prefix.myPoliteMessage.html")', isCorrect: false },
      { text: 'Xrm.Navigation.openAlertDialog(myPoliteMessage)', isCorrect: false },
      { text: 'Xrm.Utility.openWebResource("prefix_myPoliteMessage.html")', isCorrect: false },
      { text: 'Xrm.Utility.showProgressIndicator(myPoliteMessage)', isCorrect: true },
    ],
    explanation: 'The showProgressIndicator function provides a visual indicator to let users know the process is ongoing, ensuring the app stays blocked until the credit check is completed.',
    explanationImage: null,
  },
  {
    question: 'You create a Power Apps app that integrates with Dynamics 365 Customer Service. You update the app and run solution checker on the original solution. You receive an error stating solution checker cannot export the solution. You need to determine the primary cause for the issue. What is the primary cause?',
    image: null,
    choices: [
      { text: 'The original solution is locked because there is a dependent patch.', isCorrect: true },
      { text: 'The solution was not exported before running solution checker.', isCorrect: false },
      { text: 'The environment is in Administrator mode.', isCorrect: false },
      { text: 'Solution checker cannot check default solutions.', isCorrect: false },
    ],
    explanation: 'The error is caused because the original solution is locked due to a dependent patch, preventing it from being exported for solution checking.',
    explanationImage: null,
  },
  {
    question: 'An organization uses Dynamics 365 Sales. You plan to use a JavaScript web resources file in the Accounts form. The file has a dependency on two image web resource files and on the custom field new_placeofbirth in the Account entity. You need to add the dependencies for the JavaScript file. Which three actions should you perform?',
    image: null,
    choices: [
      { text: 'Open the web resource file, add the two image web resources to the dependency\'s lists, and then add the custom field new_placeofbirth to the dependency\'s list.', isCorrect: true },
      { text: 'From Settings, select Customizations and then select Customize the System.', isCorrect: true },
      { text: 'In the Account form, select Form Properties, select Non-Event Dependencies, and then add the custom field new_placeofbirth.', isCorrect: false },
      { text: 'Select Account, select Forms, and then select the Account form.', isCorrect: false },
      { text: 'From Web Resources, select the JavaScript file for the Account form and then select the JavaScript file.', isCorrect: true },
      { text: 'In the Account form, select Form Properties and add the primary JavaScript file and the other two images web resources in Form Libraries.', isCorrect: false },
    ],
    explanation: 'These steps ensure that all dependencies for the JavaScript web resource, including the image files and the custom field, are properly added to the account form.',
    explanationImage: null,
  },
  {
    question: 'A company implements Dynamics 365 Supply Chain Management. The company wants a button to display in the command bar when viewing accounts. You need to add the button using the Ribbon Workbench. In which three areas can you add a button for the Account entity?',
    image: null,
    choices: [
      { text: 'In the home area for Accounts.', isCorrect: true },
      { text: 'In the main body of a form.', isCorrect: false },
      { text: 'On the main application window.', isCorrect: false },
      { text: 'On the associated view of the account.', isCorrect: true },
      { text: 'On the Account form.', isCorrect: true },
    ],
    explanation: 'You can add a button to the home area, associated view, and account form using the Ribbon Workbench, ensuring visibility in relevant sections.',
    explanationImage: null,
  },
  {
    question: 'An organization uses Dynamics 365 Sales. You plan to add a custom button to the app ribbon. You need to ensure that the button displays only when conditions specified by business rules are met. Which two code segments can you use?',
    image: null,
    choices: [
      { text: 'gridContext.refresh();', isCorrect: false },
      { text: 'formContext.ui.refreshRibbon(refreshAll);', isCorrect: true },
      { text: 'formContext.data.refresh(save).then(successCallback, errorCallback);', isCorrect: false },
      { text: 'formContext.ui.refreshRibbon();', isCorrect: true },
      { text: 'formContext.getControl(arg).refresh();', isCorrect: false },
    ],
    explanation: 'The formContext.ui.refreshRibbon methods ensure the custom button visibility is updated when business rules are met.',
    explanationImage: null,
  },
  {
    question: 'You are developing a new Power Platform app. The checker fails with an error due to missing security roles. You need to add security roles to the Power Apps Checker application user. Which two security roles should you add?',
    image: null,
    choices: [
      { text: 'Global Discover Service Role', isCorrect: false },
      { text: 'Export Customizations', isCorrect: true },
      { text: 'Environment Maker', isCorrect: false },
      { text: 'Solution Checker', isCorrect: true },
      { text: 'Resource Manager', isCorrect: false },
    ],
    explanation: 'The Export Customizations and Solution Checker roles are required for running the checker on the Power Platform app.',
    explanationImage: null,
  },
  {
    question: 'You are creating a Power Apps app. The app must retrieve data from an API that requires two-factor authentication. You need to configure authentication. Which type of authentication should you implement?',
    image: null,
    choices: [
      { text: 'Server-to-server', isCorrect: false },
      { text: 'API key-based', isCorrect: false },
      { text: 'Basic', isCorrect: false },
      { text: 'OAuth', isCorrect: true },
    ],
    explanation: 'OAuth is the preferred authentication method for APIs requiring two-factor authentication as it supports token-based access.',
    explanationImage: null,
  },
  {
    question: 'You are creating a canvas app that realtors use to identify neighbors for properties that are for sale. The OnStart property includes the following code: ClearCollect(collectNeighborList, Filter(NeighborList, Status = "Active")); ClearCollect(collectRealtorList, CompanyList); ClearCollect(collectRegions, RegionList). The app is running slower than expected. You need to resolve the issue. What should you do?',
    image: null,
    choices: [
      { text: 'Replace all instances of the ClearCollect method with the connect method.', isCorrect: false },
      { text: 'Replace the existing code segment with the following code segment: Concurrent(ClearCollect(collectNeighborList, Filter(NeighborList, Status = "Active")), ClearCollect(collectRealtorList, CompanyList), ClearCollect(collectRegions, RegionList))', isCorrect: true },
      { text: 'Replace the existing code segment with the following code segment: ClearCollect(collectNeighborList, Filter(NeighborList, Status = "Active")); Concurrent(ClearCollect(collectRealtorList, CompanyList)); Concurrent(ClearCollect(collectRegions, RegionList));', isCorrect: false },
    ],
    explanation: 'Using the Concurrent function allows multiple ClearCollect operations to run in parallel, improving performance.',
    explanationImage: null,
  },
  {
    question: 'You create and deploy a Power Platform solution that includes synchronous plug-ins. Users report performance issues with the solution. You need to determine whether a plug-in is the cause of the performance issues. Which two tools can you use? Each correct answer presents part of the solution.',
    image: null,
    choices: [
      { text: 'Tracing', isCorrect: true },
      { text: 'Data policies', isCorrect: false },
      { text: 'Solution checker', isCorrect: true },
      { text: 'ISV Studio', isCorrect: false },
      { text: 'Microsoft Dataverse Analytics', isCorrect: false },
    ],
    explanation: 'Tracing helps to analyze the performance of plug-ins, and Solution checker helps identify any issues with custom code.',
    explanationImage: null,
  },
  {
    question: 'A company designs a solution for use in an international organization. The solution must provide multiple UI languages and currencies. You need to move components to include them as part of the solution. Which three component types can you move? Each correct answer presents part of the solution.',
    image: null,
    choices: [
      { text: 'Available UI languages', isCorrect: false },
      { text: 'Scheduled Power Automate flow', isCorrect: true },
      { text: 'Custom entity', isCorrect: true },
      { text: 'Modified standard security role', isCorrect: true },
      { text: 'Currencies enabled in the environment', isCorrect: false },
    ],
    explanation: 'Power Automate flows, custom entities, and modified security roles can be moved as components in a solution.',
    explanationImage: null,
  },
  {
    question: 'An organization uses Dynamics 365 Sales. The organization has accounting and customer service departments. You must restrict users in customer service from being able to change the value of the balance field on the Contact records. The accounting team must be the only team able to edit this field. You need to create the appropriate solution without any customizations. What should you do first?',
    image: null,
    choices: [
      { text: 'Enable field security for the balance field and grant the customer service team read and update permissions.', isCorrect: false },
      { text: 'Create a customer service form and role and a business rule that enables the balance field.', isCorrect: false },
      { text: 'Enable field security for the balance field and grant the customer service team read permissions.', isCorrect: true },
      { text: 'Enable field security for the balance field and grant the accounting team read permissions.', isCorrect: false },
    ],
    explanation: 'Enabling field security with read permissions for customer service restricts them from editing the field.',
    explanationImage: null,
  },
  {
    question: 'You have a Microsoft Dataverse entity and a model-driven app. The model-driven app integrates with an external system. You plan to run business logic each time the model-driven app creates a record. Running business logic must not negatively affect model-driven app users. You need to implement the business logic. What should you use?',
    image: null,
    choices: [
      { text: 'Synchronous plug-in registered in the PreOperation stage', isCorrect: false },
      { text: 'Synchronous workflow', isCorrect: false },
      { text: 'Asynchronous plug-in registered in the PostOperation stage', isCorrect: true },
    ],
    explanation: 'Using an asynchronous plug-in ensures that business logic does not affect user experience, as it runs after the operation completes.',
    explanationImage: null,
  },
  {
    question: 'A manufacturing company uses a Common Data Service (CDS) environment to manage their parts inventory across two warehouses modeled as business units and named WH1 and WH2. Data from the two warehouses is processed separately for each part that has its inventory quantities updated. The company must automate this process, pushing inventory updates from orders submitted to the warehouses. You need to build the automation using Power Automate flows against the CDS database. You must achieve this goal by using the least amount of administrative effort. Which flow or flows should you recommend?',
    image: null,
    choices: [
      { text: 'Two automated flows with scope Business Unit, with triggers on Create/Update/Delete on orders.', isCorrect: false },
      { text: 'Two automated flows with scope Business Unit, with triggers on Create/Update/Delete and each flow filtering updates from each business unit.', isCorrect: false },
      { text: 'Two scheduled flows, each querying and updating the parts included in orders from each business unit.', isCorrect: false },
      { text: 'One scheduled flow, querying the parts included in orders in both business units.', isCorrect: false },
      { text: 'One automated flow, querying the orders in both business units.', isCorrect: false },
      { text: 'Two scheduled flows, each querying the orders from each business unit.', isCorrect: false },
      { text: 'Two automated flows with scope Organization, with triggers on Create/Update/Delete and filters on WH1 and WH2.', isCorrect: false },
      { text: 'Two automated flow with scope Business Unit, with triggers on Create/Update/Delete on orders and filters on WH1 and WH2.', isCorrect: true },
    ],
    explanation: 'Using two automated flows with scope Business Unit and filtering for WH1 and WH2 ensures inventory updates are processed separately for each warehouse.',
    explanationImage: null,
  },
  {
    question: 'You create a Power Automate flow that retrieves data from a proprietary database. You need to ensure that the flow works for other users. Which two actions should you perform? Each correct answer presents part of the solution.',
    image: null,
    choices: [
      { text: 'Share a view with users.', isCorrect: false },
      { text: 'Share the custom connector with users.', isCorrect: true },
      { text: 'Share the flow with users.', isCorrect: true },
      { text: 'Share the environment by giving permissions to the users.', isCorrect: false },
    ],
    explanation: 'To ensure other users can run the flow, the custom connector must be shared, along with the flow itself, granting them access to both resources.',
    explanationImage: null,
  },
  {
    question: 'An organization implements Dynamics 365 Sales. You need to trigger a business rule when the main form is saved. What should you do?',
    image: null,
    choices: [
      { text: 'Write a business rule to trigger on a change of ModifiedOn field.', isCorrect: false },
      { text: 'Set the scope of the business rule to one specific form where business rule triggers.', isCorrect: false },
      { text: 'Set the scope of the business rule to All Forms.', isCorrect: false },
      { text: 'Set the scope of the business rule to Entity.', isCorrect: true },
    ],
    explanation: 'Setting the scope of the business rule to Entity ensures it runs regardless of which form is used, as it applies to the entire table (entity).',
    explanationImage: null,
  },
  {
    question: 'A company implements Dynamics 365 Sales. An email notification must be sent automatically to the sales manager when a business process completes. You need to ensure that emails are sent. What should you create on the process completed trigger?',
    image: null,
    choices: [
      { text: 'a workflow', isCorrect: true },
      { text: 'an action step', isCorrect: false },
      { text: 'a data step', isCorrect: false },
    ],
    explanation: 'A workflow allows the automation of processes such as sending email notifications when specific criteria are met, such as the completion of a business process.',
    explanationImage: null,
  },
  {
    question: 'You create a Power Virtual Agents chatbot in an environment named Environment1. A colleague creates a Power Automate flow in the default solution in the default environment. The chatbot in Environment1 does not recognize the flow in the default environment. You need to ensure the chatbot can access the flow. Which two actions should you perform? Each correct answer presents part of the solution.',
    image: null,
    choices: [
      { text: 'Add the Power Automate flow to a solution in Environment1.', isCorrect: false },
      { text: 'Send a copy of the Power Automate flow from the default environment.', isCorrect: false },
      { text: 'Add the Power Automate flow to a solution in the default environment.', isCorrect: true },
      { text: 'Export the solution from the default environment and import the solution into Environment1.', isCorrect: true },
      { text: 'Share the Power Automate flow from the default environment.', isCorrect: false },
    ],
    explanation: 'To access the flow in Environment1, the flow must be part of a solution that is exported and then imported into the same environment where the chatbot resides.',
    explanationImage: null,
  },
  {
    question: 'A customer wants to design a complex business process flow that includes six custom entities and four stages for each entity. One of the stages will have 15 steps. You need to explain the flaw in this design to the customer. What is the flaw in this design?',
    image: null,
    choices: [
      { text: 'The maximum number of custom entities has been exceeded.', isCorrect: false },
      { text: 'The maximum number of steps for a stage has been exceeded.', isCorrect: true },
      { text: 'The maximum number of stages for an entity has been exceeded.', isCorrect: false },
      { text: 'The minimum number of stages for an entity has not been met.', isCorrect: false },
      { text: 'The minimum number of steps for a stage has not been met.', isCorrect: false },
    ],
    explanation: 'The flaw in the design is that the number of steps in one of the stages exceeds the allowable maximum for a business process flow stage, which is 30 steps per stage.',
    explanationImage: null,
  },
  {
    question: 'You create a form in a model-driven app that uses data from the Lead table in a Microsoft Dataverse instance. You add a business rule to the Lead table. The business rule displays an error if the email address is null. You set the scope for the business rule to All Forms. You configure a Power Apps portal by using the same Microsoft Dataverse instance. You create a web page by using the Lead form. You need to ensure the same logic is applied on the Power Apps portal page. What are two possible ways to achieve the goal? Each correct answer presents a complete solution.',
    image: null,
    choices: [
      { text: 'Deactivate the business rule. Change the scope for the rule to Table and then reactivate the rule.', isCorrect: true },
      { text: 'Replace the business rule logic with a Microsoft Power Automate cloud flow by using the Dataverse When a row is added, modified or deleted trigger.', isCorrect: false },
      { text: 'Extend the webFormClientValidate JavaScript function to replace the business rule logic. Edit the code in Power Apps Studio. Add the function in a <script> block.', isCorrect: false },
      { text: 'Create a JavaScript web resource and replace the business rule with a JavaScript function. Add an OnSave event handler to the Lead form.', isCorrect: true },
    ],
    explanation: 'Setting the business rule scope to Table ensures it is applied across all forms, including Power Apps portal pages. Alternatively, JavaScript can replicate the same logic on the portal.',
    explanationImage: null,
  },
  {
    question: 'A company uses Microsoft Dataverse rollup fields to calculate insurance exposure and risk profiles for customers. Users report that the system does not update values for the rollup fields when new insurance policies are written. You need to recalculate the value of the rollup fields immediately after a policy is created. What should you do?',
    image: null,
    choices: [
      { text: 'Create new fields on the customer entity for insurance exposure and risk. Write a workflow process that is triggered when a new policy record is created to calculate the sum of values from policy records.', isCorrect: false },
      { text: 'Update the Mass Calculate Rollup Field job to trigger when a new policy record is created.', isCorrect: false },
      { text: 'Create a plug-in that uses the update method for the rollup fields. Configure a step on the Create event for the policy entity for this plug-in.', isCorrect: false },
      { text: 'Create a plug-in that uses the CalculateRollupFieldRequest method for the rollup field. Configure a step on the Create event for the policy entity for this plug-in.', isCorrect: true },
    ],
    explanation: 'Using the CalculateRollupFieldRequest method ensures the rollup fields are updated immediately after a policy is created.',
    explanationImage: null,
  },
  {
    question: 'An organization implements Dynamics 365 Supply Chain Management. You need to create a Microsoft Flow that runs daily. What are two possible ways to achieve this goal? Each correct answer presents a complete solution.',
    image: null,
    choices: [
      { text: 'Create the flow and set the flow frequency to daily and the interval to 1.', isCorrect: true },
      { text: 'Create the flow and set the flow frequency to daily and the interval to 24.', isCorrect: false },
      { text: 'Create the flow and set the flow frequency to hourly and the interval to 1.', isCorrect: false },
      { text: 'Create the flow and set the flow frequency to hourly and the interval to 24.', isCorrect: true },
    ],
    explanation: 'Setting the frequency to daily with an interval of 1 or hourly with an interval of 24 ensures the flow runs once every day.',
    explanationImage: null,
  },
  {
    question: 'You develop a model-driven app to manage customer information. You have the system administrator security role on all environments. You create a business process flow that is associated with the Contact table. You grant users Create, Read, and Write permissions on the business process flow. Users report that the new business process flow does not appear when the users create new contact records. You verify that you can view the business process flow when you sign into the app and create a new contact record. You need to resolve the issue. What should you do?',
    image: null,
    choices: [
      { text: 'Grant users the Run Flows privilege.', isCorrect: false },
      { text: 'In the app designer, ensure that the business process flow is added to the app.', isCorrect: false },
      { text: 'Grant users the Organization Read permission on the Process table.', isCorrect: false },
      { text: 'Open the business process flow and associate the flow with the user security roles by using the Edit security button on the command bar.', isCorrect: true },
    ],
    explanation: 'Associating the business process flow with the appropriate security roles ensures users have access to the flow when creating new records.',
    explanationImage: null,
  },
  {
    question: 'A company uses Microsoft Dataverse to store customer complaints. When a new complaint is created, a Power Automate cloud flow performs various actions based on the complaint. If the issue is resolved in fewer than four hours, the status is updated to Resolved. If the issue takes longer to resolve, the status is updated to Escalated. You need to configure the flow to route complaints in real time to either a Level 1 or Level 2 team depending on resolution time. What should you use?',
    image: null,
    choices: [
      { text: 'Switch', isCorrect: true },
      { text: 'Condition', isCorrect: false },
      { text: 'Apply to each', isCorrect: false },
      { text: 'Filter array', isCorrect: false },
    ],
    explanation: 'The Switch action allows for branching the flow into different paths based on the evaluation of a condition, such as time to resolution, and is ideal for routing complaints in real time.',
    explanationImage: null,
  },
  {
    question: "A client requires that the system send an email from a button on their customer contact form. You need to call the action from JavaScript. Which two functions achieve this result? Each correct answer presents a complete solution. NOTE: Each correct selection is worth one point.",
    image: null,
    choices: [
      { text: "Xrm.WebApi.online.executeMultiple()", isCorrect: false },
      { text: "Xrm.WebApi.online.updateRecord()", isCorrect: false },
      { text: "Xrm.WebApi.online.createRecord()", isCorrect: false },
      { text: "Xrm.WebApi.online.execute()", isCorrect: true }
    ],
    explanation: "The Xrm.WebApi.online.execute() function allows for calling actions from JavaScript, making it suitable for sending emails from the contact form.",
    explanationImage: null
  },
  {
    question: "A company has two development instances, two test instances, two staging instances, and one production instance. The test team reports connection issues with the test and staging instances. You need to identify which of the instances the testing team currently has access. Which two URLs can you use? Each correct answer presents a complete solution. NOTE: Each correct selection is worth one point.",
    image: null,
    choices: [
      { text: "https://globaldisco.crm.dynamics.com/api/discovery/v9.1/instances", isCorrect: true },
      { text: "https://myorg.api.crm.dynamics.com/api/data/v9.1/", isCorrect: false },
      { text: "https://dev.crm.dynamics.com/api/discovery/v9.1/instances", isCorrect: true },
      { text: "https://disco.crm.dynamics.com/api/discovery/v9.1/", isCorrect: false },
      { text: "https://dev.crm.dynamics.com/api/discovery/v9.1/instances(UniqueName='myorg')", isCorrect: false }
    ],
    explanation: "Both URLs for global discovery and dev discovery allow access to the instances and are critical for diagnosing the testing team's connection issues.",
    explanationImage: null
  },
  {
    question: "You are a Dynamics 365 developer working on a model-driven app. You add a button to an entity form and to the view for the entity that calls a JavaScript function. When you click the button, it results in an error. You determine that the JavaScript function is calling another JavaScript function in a different web resource. You need to resolve the error. What should you do?",
    image: null,
    choices: [
      { text: "In the JavaScript web resource, add the missing web resource as a dependency.", isCorrect: true },
      { text: "Add &ribbondebug=true to the app URL and run the Command Checker tool.", isCorrect: false },
      { text: "From the Ribbon Workbench, add the missing JavaScript web resource as a CustomRule in EnableRules.", isCorrect: false }
    ],
    explanation: "Adding the missing web resource as a dependency ensures that the JavaScript function can successfully call the function in the other web resource.",
    explanationImage: null
  },
  {
    question: "A multinational company requires that all phone numbers be standardized as country code + area code + phone number. The application design team decides that a custom Power Apps component framework (PCF) control should be used to prompt users for an area code and to correctly format the phone number. You need to get the list of valid area codes when a contact record is opened and before the user enters a new phone number. In which function should you call webAPI.retrieveMultipleRecords?",
    image: null,
    choices: [
      { text: "updateView", isCorrect: true },
      { text: "notifyOutputChanged", isCorrect: false },
      { text: "getOutputs", isCorrect: false }
    ],
    explanation: "The updateView function is called when the view is updated, making it suitable for retrieving the list of valid area codes before user input.",
    explanationImage: null
  },
  {
    question: "A company is creating a Power Apps portal to collaborate with vendors. You need to implement custom functionality in the portal by using JavaScript code. Which two portal entities can you use? Each correct answer presents a complete solution. NOTE: Each correct selection is worth one point.",
    image: null,
    choices: [
      { text: "Web pages", isCorrect: true },
      { text: "Web resources", isCorrect: true },
      { text: "Webforms", isCorrect: false },
      { text: "Entity lists", isCorrect: false }
    ],
    explanation: "Web pages and web resources are essential for implementing custom functionality within the Power Apps portal.",
    explanationImage: null
  },
  {
    question: "You are developing an app that uses Common Data Service. You must integrate Common Data Service with a new web application. You must allow the new web application to display data from Common Data Service. You build a single-page web application using the Web API. You need to authenticate your app using OAuth. What should you use?",
    image: null,
    choices: [
      { text: "Windows Communication Foundation (WCF)", isCorrect: false },
      { text: "Cross-Origin Resource Sharing (CORS)", isCorrect: false },
      { text: "Microsoft Authentication Library (MSAL)", isCorrect: true },
      { text: "Kerberos authentication", isCorrect: false }
    ],
    explanation: "Microsoft Authentication Library (MSAL) is the recommended approach for authenticating applications using OAuth in Common Data Service integrations.",
    explanationImage: null
  },
  {
    question: "You are creating a model-driven app. A JavaScript function must be manually initiated by the user from within an entity form. You need to add a button to the form to run the JavaScript. What should you do?",
    image: null,
    choices: [
      { text: "Use the Ribbon Workbench.", isCorrect: true },
      { text: "Edit the SiteMap.", isCorrect: false },
      { text: "Edit the XML for the form.", isCorrect: false },
      { text: "Edit ISV.Config.", isCorrect: false },
      { text: "Export the ribbon definitions.", isCorrect: false }
    ],
    explanation: "The Ribbon Workbench allows for customizing the command bar, including adding buttons to run JavaScript functions from within the entity form.",
    explanationImage: null
  },
  {
    question: "You are creating a canvas app for a bank. Consumers will enter information into the app when they apply for a loan. The input form for the app must display fields to prompt the consumer for their first name, last name, address, and the requested loan amount. Immediately after a consumer enters a value for the LoanAmount field, the background color for the column must change. The background color for the column must change to red if a consumer enters a value of more than $5,000 and must turn green for values less than or equal to $5,000. You need to implement the required behavior. Which option should you use?",
    image: null,
    choices: [
      { text: "Create a Power Automate flow.", isCorrect: false },
      { text: "Configure field properties.", isCorrect: false },
      { text: "Add a business rule to the form.", isCorrect: false },
      { text: "Add a formula to the LoanAmount field.", isCorrect: true }
    ],
    explanation: "Adding a formula to the LoanAmount field allows for dynamic changes in the UI based on user input, providing immediate feedback based on the entered amount.",
    explanationImage: null
  },
  {
    question: "You are creating a custom connector in Power Apps to connect to a third-party application. The definition in the connector must be set so that it is not visible to the end user. You need to select the appropriate visibility parameter. Which parameter should you use?",
    image: null,
    choices: [
      { text: "important", isCorrect: false },
      { text: "none", isCorrect: false },
      { text: "internal", isCorrect: true },
      { text: "advanced", isCorrect: false }
    ],
    explanation: "The 'internal' visibility parameter ensures that the connector definition is not visible to end users, maintaining a secure environment.",
    explanationImage: null
  },
  {
    question: "You are developing a Power Apps app to manage records in the Account table in Microsoft Dataverse. You must configure a Web API request to retrieve changes from the table. You need to configure the preference header for the API request. What should you use?",
    image: null,
    choices: [
      { text: "application/json", isCorrect: true },
      { text: "application/xml", isCorrect: false },
      { text: "application/x-www-form-urlencoded", isCorrect: false },
      { text: "text/plain", isCorrect: false }
    ],
    explanation: "Using 'application/json' as the preference header ensures that the API request can effectively retrieve data from the Dataverse Account table.",
    explanationImage: null
  },
  {
    question: "You are creating a Power App that retrieves data from a Common Data Service (CDS) entity. The app must display the last updated timestamp of the record. You need to configure the app to retrieve the last updated timestamp from the Common Data Service. Which property should you configure?",
    image: null,
    choices: [
      { text: "LastUpdatedOn", isCorrect: true },
      { text: "ModifiedOn", isCorrect: false },
      { text: "UpdatedDate", isCorrect: false },
      { text: "CreatedOn", isCorrect: false }
    ],
    explanation: "The 'LastUpdatedOn' property provides the necessary timestamp for when the record was last updated in the Common Data Service.",
    explanationImage: null
  },
  {
    question: "You are creating an integration that uses an Azure function to create records in the Common Data Service when leads are submitted from your company website. You create a user and grant the user the Basic User security role. You do not have administrator access to the environment you are using or access to Azure Active Directory. Company policy dictates that service accounts must be used for integrations, and integrations must not be granted privileges beyond what is needed. You need to recommend actions that an administrator should perform to configure access for the Azure Function. Which three actions should you perform?",
    image: null,
    choices: [
      { text: "Create an application registration in Azure Active Directory.", isCorrect: true },
      { text: "Assign the system administrator security role to the application user.", isCorrect: false },
      { text: "Assign the Power Platform administrator role to the application user in Azure Active Directory.", isCorrect: false },
      { text: "Create a new security role with the minimum required permissions and assign it to the application user.", isCorrect: true },
      { text: "Grant the application delegated permissions to the Dynamics CRM API in Azure Active Directory.", isCorrect: true },
      { text: "Deploy Azure B2B guest permissions to the application user.", isCorrect: false }
    ],
    explanation: "To properly configure access for the Azure Function, the administrator needs to create an application registration, set up the necessary security role with minimal permissions, and grant the required delegated permissions to ensure compliance with company policy and security best practices.",
    explanationImage: null
  },
  {
    question: "The communication department for a company plans to add a publicly accessible survey page to the company's public website. You must add the new survey page to the company's public website and capture data from the page to a Common Data Service environment. Explicit user credentials must not be required to write survey data to Common Data Service. You need to implement authentication. Which authentication mechanism should you implement?",
    image: null,
    choices: [
      { text: "ADFS", isCorrect: false },
      { text: "Azure AD Conditional Access", isCorrect: false },
      { text: "OAuth 2.0", isCorrect: true },
      { text: "Client secret", isCorrect: false }
    ],
    explanation: "Implementing OAuth 2.0 will allow the survey page to authenticate requests securely without requiring explicit user credentials, thus facilitating seamless data capture to the Common Data Service.",
    explanationImage: null
  },
  {
    question: "You are deploying a Power Apps app that uses the custom connector for ServiceNow. The app loads very slowly for some users. You determine that all records from ServiceNow are being retrieved for every user. The app must load only incidents that are assigned to each user. You need to limit the number of records that the connector returns. What should you do?",
    image: null,
    choices: [
      { text: "Apply a Lifecycle Services asset scope", isCorrect: false },
      { text: "Apply a business process flow", isCorrect: false },
      { text: "Apply the Azure APIM parameter", isCorrect: false },
      { text: "Apply a connector policy template", isCorrect: true }
    ],
    explanation: "Using a connector policy template can help streamline the data being fetched by the app, ensuring that only relevant incidents assigned to each user are retrieved, thus improving loading times.",
    explanationImage: null
  },
  {
    question: "A company is developing multiple plug-ins. One of the plug-ins keeps failing. You need to debug the plug-in. Which three actions should you perform?",
    image: null,
    choices: [
      { text: "Highlight the plug-in step and select Debug in the Plug-in Registration tool.", isCorrect: true },
      { text: "Copy the .pdb file into the server/bin/assembly folder.", isCorrect: false },
      { text: "Select Start Profiling in the Plug-in Registration tool.", isCorrect: true },
      { text: "Attach the debugger to the w3wp.exe process.", isCorrect: false },
      { text: "Install the plug-in profiler.", isCorrect: true }
    ],
    explanation: "To effectively debug the failing plug-in, you should use the debugging features in the Plug-in Registration tool, start profiling the plug-in, and ensure that the plug-in profiler is installed to gather additional context about the failure.",
    explanationImage: null
  },
  {
    question: "A company needs to illustrate the relationships of the entities in Dynamics 365 Sales. You need to select the appropriate tool to show this graphic. Which tool should you select?",
    image: null,
    choices: [
      { text: "Metadata diagram", isCorrect: true },
      { text: "Sales Insights", isCorrect: false },
      { text: "Power Automate", isCorrect: false },
      { text: "Security model", isCorrect: false }
    ],
    explanation: "The Metadata diagram is specifically designed to visually represent the relationships between entities in Dynamics 365 Sales, making it the ideal choice for this requirement.",
    explanationImage: null
  },
  {
    question: "A company uses a third-party shipping company to deliver products to customers. You need to design a custom connector that retrieves the shipping fees from the shipping company API. Which three elements should you define for the custom connector?",
    image: null,
    choices: [
      { text: "Authentication model", isCorrect: true },
      { text: "Address parameter", isCorrect: true },
      { text: "OpenAPI definition", isCorrect: true },
      { text: "Fee parameter", isCorrect: false },
      { text: "Fee reference", isCorrect: false }
    ],
    explanation: "Defining the authentication model, the necessary parameters like address, and creating an OpenAPI definition are crucial for successfully designing a custom connector that integrates with the shipping company's API.",
    explanationImage: null
  },
  {
    question: "You are creating a Power Apps app that retrieves customer information from Azure Active Directory when you use the app to look up a customer record. You create an Azure Function by using JSON code to retrieve the customer information. You need to make the application work. Which two actions should you perform?",
    image: null,
    choices: [
      { text: "Create a Power Automate flow to import data.", isCorrect: false },
      { text: "Create a custom connector that uses the Azure Function API.", isCorrect: true },
      { text: "Copy your JSON code to the app.", isCorrect: false },
      { text: "Create a custom connector that uses the JSON code.", isCorrect: false },
      { text: "Create an API definition for the Azure Function.", isCorrect: true }
    ],
    explanation: "Creating a custom connector that uses the Azure Function API and defining the API will enable the app to effectively retrieve customer information from Azure Active Directory.",
    explanationImage: null
  },
  {
    question: "You create a plug-in to validate data. Users report that validation is not working as expected. You need to debug the plug-in. Which tool should you use?",
    image: null,
    choices: [
      { text: "Plug-in profiler", isCorrect: true },
      { text: "Power Platform Tools for Visual Studio", isCorrect: false },
      { text: "Plug-in dashboard", isCorrect: false },
      { text: "Plug-in Registration Tool", isCorrect: false }
    ],
    explanation: "The Plug-in profiler is specifically designed for debugging plug-ins and will provide the necessary insights to identify and resolve the validation issues.",
    explanationImage: null
  },
  {
    question: "You are creating a plug-in for an app that helps government employees get a proof of vaccination card. You must add the following information to a vaccination record before a proof of vaccination card is created: Vaccination type, Date of vaccination, Name of person administering the vaccine. You need to register the plug-in. In which stage should you register the plug-in?",
    image: null,
    choices: [
      { text: "PreValidation", isCorrect: false },
      { text: "PostOperation", isCorrect: false },
      { text: "MainOperation", isCorrect: false },
      { text: "PreOperation", isCorrect: true }
    ],
    explanation: "Registering the plug-in in the PreOperation stage ensures that the necessary data is available and validated before the vaccination record is created.",
    explanationImage: null
  },
  {
    question: "You manage a Microsoft Power Automate cloud flow. The cloud flow queries Microsoft Dataverse data by using the List rows action. You need to configure the cloud flow to process 10,000 records in a single run. What should you do?",
    image: null,
    choices: [
      { text: "Set the row count parameter to 10,000.", isCorrect: false },
      { text: "Return the first 5,000 records and use the @odata.nextLink in the response to return the remaining records.", isCorrect: true },
      { text: "Create the query by using FetchXML and set the top parameter to 10,000.", isCorrect: false },
      { text: "Turn on pagination and set the threshold to 10,000.", isCorrect: true }
    ],
    explanation: "By using pagination and correctly handling the @odata.nextLink, the cloud flow can efficiently process large datasets while adhering to the limitations of the List rows action.",
    explanationImage: null
  },
  {
    question: "A company requires a plug-in that makes multiple requests to an external web service. The plug-in must not time out when the web service has issues or is slow to respond. You need to create the plug-in. What should you do?",
    image: null,
    choices: [
      { text: "Assign the IOrganizationService object to a member variable.", isCorrect: false },
      { text: "Register the plug-in to run synchronously.", isCorrect: false },
      { text: "Register the plug-in step once for each web service request.", isCorrect: false },
      { text: "Set the HTTP connection KeepAlive property to false.", isCorrect: true }
    ],
    explanation: "Setting the HTTP connection KeepAlive property to false will prevent the plug-in from timing out during slow responses from the external web service, thus ensuring reliable performance.",
    explanationImage: null
  },
  {
    question: "A company uses Microsoft Dataverse to store customer complaints. When a new complaint is created, a Power Automate cloud flow performs various actions based on the complaint. If the issue is resolved in fewer than four hours, the status is updated to Resolved. If the issue takes longer to resolve, the status is updated to Escalated. You need to configure the flow to route complaints in real time to either a Level 1 or Level 2 team depending on resolution time. What should you use?",
    image: null,
    choices: [
      { text: "Switch", isCorrect: true },
      { text: "Condition", isCorrect: false },
      { text: "Apply to each", isCorrect: false },
      { text: "Filter array", isCorrect: false }
    ],
    explanation: "The Switch action allows for branching the flow into different paths based on the evaluation of a condition, such as time to resolution, and is ideal for routing complaints in real time.",
    explanationImage: null
  },
  {
    question: "A company plans to replicate a Dynamics 365 Sales database into an Azure SQL Database instance for reporting purposes. The Data Export Service solution has been installed. You need to configure the Data Export service. Which three actions should you perform?",
    image: null,
    choices: [
      { text: "Enable auditing for all entities that must be replicated to Azure SQL Database.", isCorrect: true },
      { text: "Create an export profile that specifies all the entities that must be replicated.", isCorrect: true },
      { text: "Set up server-based integration.", isCorrect: false },
      { text: "Enable change tracking for all entities that must be replicated to Azure SQL Database.", isCorrect: true },
      { text: "Create an Azure SQL Database service in the same tenant as the Dynamics 365 Sales environment.", isCorrect: true }
    ],
    explanation: "To configure the Data Export Service effectively, enabling auditing, creating an export profile, and enabling change tracking for relevant entities are essential steps to ensure data is replicated accurately and efficiently.",
    explanationImage: null
  },
  {
    question: "You are creating a Power Automate flow. You create an Azure Service Bus listener app that receives requests from a third-party application. When the flow calls the message queue, it must delete the message as soon as it is read. You need to ensure that the queue is cleared properly. Which method or class should you use?",
    image: null,
    choices: [
      { text: "ReceiveMode", isCorrect: true },
      { text: "BrokeredMessage", isCorrect: false },
      { text: "EventHubReceiver", isCorrect: false },
      { text: "EventHubSender", isCorrect: false }
    ],
    explanation: "Using ReceiveMode will ensure that messages are deleted from the queue immediately after being read, which is crucial for maintaining proper queue management in the Azure Service Bus.",
    explanationImage: null
  },
  {
    question: "As part of the month-end financial closing process, a company uses a batch job to copy all orders into a staging database. The staging database is used to calculate any outstanding amounts owed by clients and must process all historical data. You need to ensure that only the data affected during the month is included in the integration process. What are two possible ways to achieve this goal?",
    image: null,
    choices: [
      { text: "Use change tracking on the orders and run the integration to retrieve new orders and the orders that have the total amount changed in the last month.", isCorrect: true },
      { text: "Create a system view with the orders that have the Modified On field in the last month and run the integration on this subset.", isCorrect: true },
      { text: "Use change tracking on the order lines and run the integration every week and retrieve only the order lines that have been created or deleted in the last month.", isCorrect: false },
      { text: "Create a system view with the order lines that have the Modified On field in the last month and run the integration on this subset.", isCorrect: false }
    ],
    explanation: "Utilizing change tracking and creating a system view with the Modified On field will allow for accurate filtering of data, ensuring only relevant orders are included in the monthly integration process.",
    explanationImage: null
  },
  {
    question: "A company is creating a one-way integration from Microsoft Dataverse to an external system. Data will be sent from a webhook to an Azure Function. You need to configure the Azure Function to handle data from the webhook. Which class and data type must the Azure Function handle?",
    image: null,
    choices: [
      { text: "RemoteExecutionContext in .NET binary format", isCorrect: false },
      { text: "RemoteExecutionContext in JSON format", isCorrect: true },
      { text: "RemoteExecutionContext in XML format", isCorrect: false },
      { text: "IPluginExecutionContext in JSON format", isCorrect: false },
      { text: "IPluginExecutionContext in XML format", isCorrect: false }
    ],
    explanation: "The Azure Function should handle RemoteExecutionContext in JSON format to effectively manage the data sent from the webhook, ensuring compatibility and ease of processing.",
    explanationImage: null
  },
  {
    question: "You are creating an integration between Microsoft Dataverse and an external system. Messages from Dataverse must be sent to Microsoft Azure Service Bus. An Azure Function will process the messages. Events must be published directly to the ServiceEndpoint for Azure Service Bus. You need to create code for the messages. Which class should you use?",
    image: null,
    choices: [
      { text: "RemoteExecutionContext", isCorrect: true },
      { text: "IWorkflowContext", isCorrect: false },
      { text: "IPluginExecutionContext", isCorrect: false },
      { text: "IExecutionContext", isCorrect: false }
    ],
    explanation: "Using the RemoteExecutionContext class is essential for creating messages that can be successfully sent to the Azure Service Bus from Dataverse.",
    explanationImage: null
  },
  {
    question: "The communication department for a company plans to add a publicly accessible survey page to the company’s public website. You must add the new survey page to the company’s public website and capture data from the page to a Microsoft Dataverse environment. Explicit user credentials must not be required to write survey data to Dataverse. You need to implement authentication. Which authentication mechanism should you implement?",
    image: null,
    choices: [
      { text: "Claims based", isCorrect: false },
      { text: "Microsoft 365", isCorrect: false },
      { text: "Azure guest account", isCorrect: false },
      { text: "Client secret", isCorrect: true }
    ],
    explanation: "Implementing a client secret allows for secure authentication without requiring explicit user credentials, making it suitable for capturing survey data from the public website.",
    explanationImage: null
  },
  {
    question: "A company has a model-driven app that uses Microsoft Dataverse. The company requires a web application that retrieves information from the model-driven app. The requirements for the web application include: Must be a single-page web application that uses the Web API. Must display the correct company information. Must authenticate using OAuth without additional verification. You need to configure the web application. Which two methods should you use?",
    image: null,
    choices: [
      { text: "NTLM authentication", isCorrect: false },
      { text: "Kerberos Authentication", isCorrect: false },
      { text: "Microsoft Azure Active Directory Authentication Libraries (ADAL)", isCorrect: true },
      { text: "Microsoft Authentication Library (MSAL)", isCorrect: true },
      { text: "Multifactor authentication", isCorrect: false }
    ],
    explanation: "Using ADAL or MSAL for authentication will ensure the web application can securely authenticate users through OAuth without additional verification steps, aligning with the requirements.",
    explanationImage: null
  },
  {
    question: "You develop code that will perform an update to existing records in a table. The update must occur based on the alternate key configured for the table. You need to perform the update. Which two requests should you use?",
    image: null,
    choices: [
      { text: "UpdateRequest", isCorrect: true },
      { text: "UpsertRequest", isCorrect: true },
      { text: "CreateRequest", isCorrect: false },
      { text: "RetrieveRequest", isCorrect: false }
    ],
    explanation: "Using UpdateRequest and UpsertRequest will allow for efficient updates to records based on the alternate key, ensuring that changes are applied correctly to the existing data.",
    explanationImage: null
  },
  {
    question: "You are implementing business logic for a model-driven app form by using multiple JavaScript web resources. The business logic, number of JavaScript files, and the columns that the business logic requires are expected to change frequently. Some form fields will not be visible. Occasionally, non-developers will also make changes to the form. You need to prevent columns referenced by the JavaScript from accidentally being removed from the form based. What should you do?",
    image: null,
    choices: [
      { text: "Hide columns that should not be displayed.", isCorrect: false },
      { text: "Set all columns as business required.", isCorrect: false },
      { text: "Add all columns as non-event dependencies to the form.", isCorrect: true },
      { text: "Add columns in each JavaScript file as a dependency.", isCorrect: false }
    ],
    explanation: "By adding all columns as non-event dependencies to the form, you ensure that these columns remain part of the form structure and cannot be inadvertently removed, even when non-developers make changes.",
    explanationImage: null
  },
  {
    question: "You are creating a model-driven app for Contoso, Ltd. You add a button to the account page. The button must send a text message to the company's account team when a user selects the button. The account team reports that they are not receiving messages when users select the button. You are troubleshooting the app by using the following hyperlink: https://contoso.com.dynamics.com/main.aspx?appid=3b157789-5e5b-ec11-8f8f-002248087922&ribbondebug=true. What is the purpose of the hyperlink?",
    image: null,
    choices: [
      { text: "Run Command Checker for all buttons on the page.", isCorrect: false },
      { text: "Add the Power Apps Checker button to the page.", isCorrect: false },
      { text: "Run Power Apps Checker for all buttons on the page.", isCorrect: true },
      { text: "Add the Command Checker button to the page.", isCorrect: false }
    ],
    explanation: "This hyperlink runs the Power Apps Checker for all buttons on the page, allowing you to identify issues with the button functionality and ensure that messages are sent correctly when the button is pressed.",
    explanationImage: null
  },
  {
    question: "A company uses Microsoft Dataverse rollup fields to calculate insurance exposure and risk profiles for customers. Users report that the system does not update values for the rollup fields when new insurance policies are written. You need to recalculate the value of the rollup fields immediately after a policy is created. What should you do?",
    image: null,
    choices: [
      { text: "Create new calculated fields on the customer entity for insurance exposure and risk. Create a formula to calculate the sum of values from policy records.", isCorrect: false },
      { text: "Change the frequency of the Calculate Rollup Field recurring job from every hour to every five minutes.", isCorrect: false },
      { text: "Create a plug-in that uses the update method for the rollup fields. Configure a step on the Create event for the policy entity for this plug-in.", isCorrect: false },
      { text: "Create a plug-in that uses the CalculateRollupFieldRequest method for the rollup field. Configure a step on the Create event for the policy entity for this plug-in.", isCorrect: true }
    ],
    explanation: "By creating a plug-in that utilizes the CalculateRollupFieldRequest method, you ensure that the rollup fields are recalculated immediately upon the creation of a new insurance policy, addressing the reporting issue.",
    explanationImage: null
  },
  {
    question: "You are developing a Power Platform app. The app must implement a two-way listener to an on-premises system by using Microsoft Azure Service Bus. You create an Azure Service Bus namespace and messaging entity. You must add the shared access policies. You need to select the permissions for the messaging entity. Which two permissions should you use?",
    image: null,
    choices: [
      { text: "System customizer", isCorrect: false },
      { text: "Listen", isCorrect: true },
      { text: "Read", isCorrect: false },
      { text: "Send", isCorrect: true },
      { text: "Manage", isCorrect: false }
    ],
    explanation: "To facilitate the two-way listener functionality, granting Listen and Send permissions to the messaging entity is essential. This allows the app to receive and send messages through the Azure Service Bus effectively.",
    explanationImage: null
  },
  {
    question: "You are troubleshooting a new canvas app. Users report the app loads slowly. You use the Monitor tool to view various events being performed in the app. Events performed in the app do not have formula details. You need to enable formulas to be included with the Monitor tool events. What should you do?",
    image: null,
    choices: [
      { text: "Add the Microsoft Azure Application Insights data source to the canvas app", isCorrect: false },
      { text: "After each event, implement the trace function within the canvas app.", isCorrect: true },
      { text: "Turn on the Debug published app setting in the canvas app", isCorrect: false },
      { text: "Validate the Application Insights instrumentation key has been populated in the app object's properties within the canvas app", isCorrect: false }
    ],
    explanation: "Implementing the trace function after each event within the canvas app allows for detailed logging of formulas and events, making it easier to diagnose performance issues and improve load times.",
    explanationImage: null
  },

];

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionHistory, setQuestionHistory] = useState([]);

  useEffect(() => {
    const shuffledQuestions = [...hardcodedQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffledQuestions);
    setQuestionHistory([0]);
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newQuestionIndex);
      setQuestionHistory((prevHistory) => [...prevHistory, newQuestionIndex]);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop();
      const previousQuestionIndex = newHistory[newHistory.length - 1];
      setCurrentQuestionIndex(previousQuestionIndex);
      setQuestionHistory(newHistory);
    }
  };

  return (
    <div className="quiz-page">
      {questions.length > 0 && (
        <StudyQuestionCard questionData={questions[currentQuestionIndex]} />
      )}

      <div className="navigation-buttons">
        <button onClick={handlePreviousQuestion} disabled={questionHistory.length === 1}>
          Previous Question
        </button>
        <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
          Next Question
        </button>
      </div>
    </div>
  );
}