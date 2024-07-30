const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.getDiagnosisBySymptoms = functions.https.onCall(async (data, context) => {
    try {
        const symptoms = data.symptoms; // Assuming 'symptoms' is an array of strings

        if (!Array.isArray(symptoms)) {
            throw new functions.https.HttpsError('invalid-argument', 'The request must contain an array of symptoms.');
        }

        const diagnosesRef = admin.firestore().collection('diagnosis');
        let diagnosisResults = [];

        for (const symptom of symptoms) {
            const querySnapshot = await diagnosesRef.where('symptoms', 'array-contains', symptom).get();
            querySnapshot.forEach(doc => {
                // Prevent duplicate diagnoses by checking if the diagnosis ID is already in the results
                if (!diagnosisResults.some(result => result.id === doc.id)) {
                    diagnosisResults.push({ id: doc.id, ...doc.data() });
                }
            });
        }

        return diagnosisResults;
    } catch (error) {
        console.error("Error getting diagnosis by symptoms:", error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});



const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.getMedicinesByDiagnosis = functions.https.onCall(async (data, context) => {
    try {
        const diagnosis = data.diagnosis; // Assuming 'diagnosis' is a string

        if (!diagnosis || typeof diagnosis !== 'string') {
            throw new functions.https.HttpsError('invalid-argument', 'The request must contain a diagnosis string.');
        }

        const medicinesRef = admin.firestore().collection('medicines');
        let medicineResults = [];

        const querySnapshot = await medicinesRef.where('diagnosis', 'array-contains', diagnosis).get();
        
        querySnapshot.forEach(doc => {
            medicineResults.push({ id: doc.id, ...doc.data() });
        });

        return medicineResults;
    } catch (error) {
        console.error("Error getting medicines by diagnosis:", error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});








