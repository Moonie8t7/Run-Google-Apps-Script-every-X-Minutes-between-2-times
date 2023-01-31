/**
 * @author u/IAmMoonie <https://www.reddit.com/user/IAmMoonie/>
 * @file https://www.reddit.com/r/GoogleAppsScript/comments/10l1ady/a_trigger_that_runs_every_15_mintues_between/
 * @desc The script sets up a trigger to run every 15 minutes between 5pm and 11pm
 * @license MIT
 * @version 1.0
 */

/**
 * It creates a trigger that runs the function setRecurringScript_() every day at 5pm
 * Set this trigger up as a daily trigger than runs earlier than the setReccuringScript_ function
 */
function setDailyTrigger() {
  ScriptApp.newTrigger("setRecurringScript_")
    .timeBased()
    .atHour(17)
    .everyDays(1)
    .create();
}

/**
 * If there is no trigger that runs the function runEvery15Minutes_ every 15 minutes, then create one
 */
function setRecurringScript_() {
  /* Checking if there is a trigger that runs the function called runEvery15Minutes_ that runs every 15 minutes. */
  const existingTrigger = ScriptApp.getScriptTriggers().find(
    (t) =>
      t.getHandlerFunction() === "runEvery15Minutes_" &&
      t.getEventType() === ScriptApp.EventType.CLOCK
  );
  if (!existingTrigger) {
    /* If no trigger found, create a trigger that runs the function runEvery15Minutes_ every 15 minutes. */
    ScriptApp.newTrigger("runEvery15Minutes_")
      .timeBased()
      .everyMinutes(15)
      .create();
  } else {
    /* If the trigger is found, log a message to the Stackdriver Logging console. */
    console.log("Trigger already exists.");
  }
}

/**
 * If the current time is between 5pm and 11pm, then run the function every 15 minutes. Otherwise,
 * delete the trigger
 */
function runEvery15Minutes_() {
  /* Getting the current hour of the day. */
  const currentTime = new Date().getHours();

  /* Checking if the current time is between 5pm and 11pm. If it is, then it will run the function
  every 15 minutes. Otherwise, it will delete the trigger. */
  if (currentTime >= 17 && currentTime < 23) {
    /** Place the script you want to run every 15 minutes between 5pm and 11pm in this if section. */
    console.log("Running every 15 minutes between 5pm and 11pm.");
  } else {
    deleteTriggerByFunctionName("runEvery15Minutes_");
    deleteTriggerByFunctionName("setRecurringScript_");
  }
}

/**
 * It deletes all triggers that are associated with the function name that is passed to it
 * @param funcName - The name of the function that you want to delete the trigger for.
 */
function deleteTriggerByFunctionName(funcName) {
  /* Getting all the triggers that are associated with the script. */
  const triggers = ScriptApp.getScriptTriggers();
  /* Deleting all triggers that are associated with the function name that is passed to it. */
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === funcName) {
      ScriptApp.deleteTrigger(triggers[i]);
      console.log("Trigger deleted.");
    }
  }
}
