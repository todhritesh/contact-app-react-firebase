import React, { useEffect, useState } from 'react'
import { auth } from '../firebase-config'
import { RecaptchaVerifier , signInWithPhoneNumber } from 'firebase/auth'
import { toast } from 'react-toastify'

function Login() {
    const countryCode = '+91'
    const [phoneNo, setPhoneNo] = useState(countryCode)
    const [otp, setOtp] = useState('')
    const [showOptField, setShowOtpField] = useState(false)
    const [reSendOtp , setReSendOtp] = useState(false);
    let resendTime = 30;
    const [resendOtpCounter , setResendOtpCounter] = useState(0)

    const generateReCapthca = () => { 
        if(window.recaptchaVerifier){
            window.recaptchaVerifier = undefined
            document.getElementById('submit-btn-container').innerHTML = '<div className="mb-3" id="submit-btn">'
        }
        window.recaptchaVerifier = new RecaptchaVerifier('submit-btn',{
            'size':'invisible',
            'callback' : () =>{
    
            }
        },auth)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (phoneNo.length === 13) {
            if(reSendOtp){
                setReSendOtp(false)
            }
            setResendOtpCounter(resendTime)
            setTimeout(()=>{
                setReSendOtp(true)
            },resendTime * 1000)
            setShowOtpField(true)
            generateReCapthca();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth , phoneNo , appVerifier)
            .then(confirmationResult => {
                toast.success(`Sms sent to ${phoneNo}`)
                window.confirmationResult = confirmationResult;
            }).catch(err=>{
                toast.error('Something went wrong !')
                console.log(err)
            })
        }
    }

    function resendTimeCounterDec(){
        setResendOtpCounter(resendOtpCounter-1);
    }

    useEffect(()=>{
        if(resendOtpCounter===0){
            console.log("TIME LEFT IS 0");
            // setReSendOtp(true)
            setResendOtpCounter(0)
         }
     
         if (!resendOtpCounter) return;
     
         const intervalId = setInterval(
            resendTimeCounterDec
         , 1000);
     
         return () => clearInterval(intervalId);
    },[resendOtpCounter])

  

    function verifyOtp(e){
        setOtp(e.target.value);
        if(e.target.value.length===6){
            console.log(otp.length)
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(e.target.value).then(result=>{
                toast.success("Logged in successfully !")
                console.log(result.user)
            }).catch(err=>{
                console.log('not singned in')
                console.log(err)
            })
        }else{
            console.log(otp.length)
        }
    }
    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Phone Number</label>
                <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} type="text" className="form-control" />
            </div>
            {
                showOptField &&
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Enter Otp</label>
                    <input value={otp} onChange={verifyOtp} type="text" className="form-control" />
                </div>
            }
            {
                !showOptField && 
                <div className="mb-3">
                    <input type="submit" className="btn btn-success" />
                </div>
            }

            {
                (reSendOtp && !resendOtpCounter) ?
                <div className="mb-3">
                    <button type="submit" onClick={(e)=>handleSubmit(e)} className='btn btn-warning'>Resend Otp</button>
                </div>
                :
                ( resendOtpCounter) ?
                <div className="mb-3 h6">
                    {`Resend otp in ${resendOtpCounter}`}
                </div> : null
            }


            <div id="submit-btn-container">
                <div className="mb-3" id="submit-btn">

                </div>
            </div>
        </form>
    )
}

export default Login