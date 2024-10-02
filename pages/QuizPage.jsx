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