# Ru Google Apps Script: every X Minutes between 2 times
The script sets up a trigger to run every X minutes between time A and time B


The function setDailyTrigger() creates a trigger that runs the function setRecurringScript_() every day at 5 pm.

The function setRecurringScript_() checks if there is already a trigger that runs the function runEvery15Minutes_ every 15 minutes. If there is no such trigger, it creates one. If there is, it logs a message to the Stackdriver Logging console.

The function runEvery15Minutes_() gets the current hour of the day and checks if it is between 5pm and 11pm. If it is, it runs the script that is placed in the if section (in this example it just logs a message). If the current time is not between 5pm and 11pm, it deletes the triggers for runEvery15Minutes_ and setRecurringScript_.

The function deleteTriggerByFunctionName(funcName) is a helper function that takes in a function name and deletes all triggers associated with that function name. It gets all the triggers associated with the script and deletes the ones that match the passed in the function name.
