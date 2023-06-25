import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';
import MetaData from '../../../components/MetaData';
import UserContext from '../../../context/UserContext';
import { useNavigate } from 'react-router';
import { SendMail } from '../../../Redux/actions/mailAction';
import { useDispatch } from 'react-redux';


const stripePromise = loadStripe('pk_test_WLGhRYS6M1nD97KjvRWJIA6600RIBSS5BD');

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { userLog, setUserLog } = useContext(UserContext);
    const [successAction, setSuccessAction] = useState(false);
    const [problemAction, setProblemAction] = useState(false);
    const [errorAction, setErrorAction] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userLog.isLogged) {
            navigate('/')
        }
    }, [userLog]);

    const [inputForm, setInputForm] = useState({
        amount: ""
    })

    const dispatch = useDispatch();

    const handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputForm({ ...inputForm, [name]: value });
    };


    const emptyValue = () => {
        setInputForm({
            amount: "",
        });
    };

    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        if (elements !== null) {

            const cardNumberElement = elements.getElement(CardElement);

            const cardNumberChangeHandler = (event) => {
                if (inputForm.amount.trim() !== "") {
                    setDisableButton(!event.complete);
                } else {
                    setDisableButton(true)
                }
            };

            cardNumberElement.addEventListener('change', cardNumberChangeHandler);


            return () => {
                cardNumberElement.removeEventListener('change', cardNumberChangeHandler);
            };
        } else {
            setDisableButton(true)
        }
    }, [elements, inputForm]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Obtenir le client secret à partir de votre backend Symfony
        const response = await fetch(`${process.env.REACT_APP_URLBACKEND}/create_stripe_payment_intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userLog.token}`
            },
            // Envoyer les détails de paiement au backend
            body: JSON.stringify({
                amount: parseFloat(inputForm.amount) * 100,
            }),
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
            dispatch(SendMail({
                amount: parseFloat(inputForm.amount),
                sender: "mr.ousmanediarra@gmail.com",
                username: userLog.username,
                email: userLog.emailUser,
                mosquee: "mosquée Al Rahma",
                subject: "Don de amount€ à la mosquee",
                content: "<p> username, nous vous confirmons la recepetion de votre don d'un montant de <strong>amount€</strong> pour la mosquee.</p> <p>Nous vous remercions pour votre confiance et espérons continuer à nous améliorer par la suite pour convenir à vos besoins.</p> <p>En cas de problème, cet email pourra servir de justificatif de paiement.</p> <p>Cordialement</p>"
            }, userLog.token))
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
                    <p className='successAction'>Paiement d'un montant de {inputForm.amount}€ validé.</p>
                }
                {
                    errorAction
                    &&
                    <p className='errorAction'>Veuillez entrer une carte de paiement valide.</p>
                }
                <form onSubmit={handleSubmit} className='form' id='loginForm'>
                    <div className="fieldsForm">
                        <div className="field">
                            <label htmlFor="amount" className='fieldName'>Montant</label>
                            <input onChange={handleChangeInput} className='fieldValue' type="number" name="amount" />
                        </div>
                        <div className="field">
                            <CardElement className='stripe-element' />
                        </div>
                    </div>
                    <button disabled={disableButton} type="submit" className='button' id="logIn">
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