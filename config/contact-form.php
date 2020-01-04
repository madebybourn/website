<?php

use craft\contactform\models\Submission;
use yii\base\Event;

// ...

Event::on(Submission::class, Submission::EVENT_AFTER_VALIDATE, function(Event $e) {
    /** @var Submission $submission */
    $submission = $e->sender;
    
    // Make sure that `message[firstName]` was filled in
    // if (empty($submission->message['firstName'])) {
    //     // Add the error
    //     // (This will be accessible via `message.getErrors('message.firstName')` in the template.)
    //     $submission->addError('firstName', 'A first name is required.');
    // }

    // if (empty($submission->message['lastName'])) {
    //     $submission->addError('lastName', 'A last name is required.');
    // }

    // Make sure that `fromName` was filled in
    if (empty($submission->fromName)) {
        $submission->addError('fromName', 'Your Name cannot be blank.');
    }
});