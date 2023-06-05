import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';
import MetaData from '../../../components/MetaData';


const stripePromise = loadStripe('pk_test_WLGhRYS6M1nD97KjvRWJIA6600RIBSS5BD');

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [successAction, setSuccessAction] = useState(false);
    const [problemAction, setProblemAction] = useState(false);
    const [errorAction, setErrorAction] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Obtenir le client secret à partir de votre backend Symfony
        const response = await fetch('http://127.0.0.1:8000/apiLinked/create_stripe_payment_intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Envoyer les détails de paiement au backend
            body: JSON.stringify({ amount: 1000 }),
        });
        console.log(response);

        const { clientSecret } = await response.json();

        // Confirmer le paiement avec le client secret de Stripe
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                // Ajoutez d'autres informations de paiement si nécessaire
            },
        });

        if (result.error) {
            // Gérer les erreurs de paiement
            setErrorAction(true)
            setTimeout(() => {
                setErrorAction(false)
            }, 5000);
            console.log(result.error.message);
        } else {
            // Le paiement a été effectué avec succès
            setSuccessAction(true)
            setTimeout(() => {
                setSuccessAction(false)
            }, 5000);
            console.log('Paiement réussi !', result.paymentIntent);
        }
    };

    return (
        <>
            <MetaData title={`Dons - Linked`} index="false" />
            <div>
                <h1 className='main-title'>Faire un Don</h1>
                {
                    successAction
                    &&
                    <p className='successAction'>Paiement validé.</p>
                }
                {
                    errorAction
                    &&
                    <p className='errorAction'>Veuillez entrer une carte de paiement valide.</p>
                }
                <form onSubmit={handleSubmit} className='form' id='loginForm'>
                    <div className="fieldsForm">
                        <div className="field">
                            <label htmlFor="montant" className='fieldName'>Montant</label>
                            <input className='fieldValue' type="number" name="montant" />
                        </div>
                        <div className="field">
                            <CardElement className='stripe-element' />
                        </div>
                    </div>
                    <button type="submit" className='button' id="logIn">
                        <span>Faire un don</span>
                    </button>
                </form>
            </div>
        </>
    );
};

const StripePaymentForm = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default StripePaymentForm;