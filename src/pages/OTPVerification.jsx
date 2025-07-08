import React, { useState, useRef, useEffect } from 'react'
import Logo from '../assets/logo.jpg'
import Button from '../components/Button'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { authService } from '../api/services.js'
import { toast } from 'react-toastify'

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(0);
  const inputRefs = useRef([]);

  const location = useLocation();
  const email = location.state?.email || '';
  const navigate = useNavigate();

  // Redirect if no email is provided
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  useEffect(() => {
    // Only initialize timer if we have an email
    if (!email) return;
    
    const savedEndTime = localStorage.getItem('otpEndTime');
    const now = Date.now();
    
    if (savedEndTime) {
      const remainingTime = Math.max(0, Math.floor((parseInt(savedEndTime) - now) / 1000));
      if (remainingTime > 0) {
        setTimer(remainingTime);
      } else {
        // If saved time is expired, start fresh timer
        localStorage.removeItem('otpEndTime');
        const endTime = now + (300 * 1000); // 5 minutes from now
        localStorage.setItem('otpEndTime', endTime.toString());
        setTimer(300);
      }
    } else {
      // No saved time - start fresh timer
      const endTime = now + (300 * 1000); // 5 minutes from now
      localStorage.setItem('otpEndTime', endTime.toString());
      setTimer(300);
    }
  }, [email]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          const newTimer = prev - 1;
          if (newTimer <= 0) {
            localStorage.removeItem('otpEndTime');
          }
          return newTimer;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (errors.otp) {
      setErrors({});
    }

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];
        for (let i = 0; i < 6; i++) {
          newOtp[i] = digits[i] || '';
        }
        setOtp(newOtp);
        const lastIndex = Math.min(digits.length, 5);
        inputRefs.current[lastIndex]?.focus();
      });
    }
  };

  const validateForm = () => {
    const otpString = otp.join('');
    const newErrors = {};
    
    if (otpString.length !== 6) {
      newErrors.otp = "Please enter all 6 digits";
    } else if (!/^\d{6}$/.test(otpString)) {
      newErrors.otp = "OTP must contain only numbers";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (!email) {
      setErrors({ form: 'Email is required to verify OTP.' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
        const otpString = otp.join('');
      
        const response = await authService.verifyOTP(email, otpString);
        if (response.success) {
            
        } else {
            setErrors({ form: 'OTP verification failed. Please try again.' });
            return;
        }
        navigate('/reset-password', { state: { email, otpString } });
    } catch (error) {
      setErrors({ form: 'Invalid OTP. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      console.log('Resending OTP...');

      try {
        const response = await authService.forgotPassword(email);
        if (response.success) {
          toast.success('OTP has been resent to your email.');
        } else {
          setErrors({ form: 'Failed to resend OTP. Please try again.' });
          return;
        }
      } catch (error) {
        setErrors({ form: 'Failed to resend OTP. Please try again.' });
      }
      
      const newEndTime = Date.now() + (300 * 1000); // 5 minutes from now
      localStorage.setItem('otpEndTime', newEndTime.toString());
      setTimer(300);
      setOtp(['', '', '', '', '', '']);
      setErrors({});
      
      inputRefs.current[0]?.focus();
    } catch (error) {
      setErrors({ form: 'Failed to resend OTP. Please try again.' });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <img src={Logo} alt="ReUsed Logo" className="h-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Enter Verification Code</h1>
            <p className="mt-2 text-gray-600">
              We've sent a 6-digit code to your email address
            </p>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-8">
            <form onSubmit={handleSubmit}>
              {errors.form && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex">
                    <i className="fas fa-exclamation-circle text-red-400 mr-2 mt-0.5"></i>
                    <span className="text-red-700 text-sm">{errors.form}</span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Enter OTP
                </label>
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 h-12 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.otp ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="0"
                    />
                  ))}
                </div>
                {errors.otp && (
                  <p className="mt-2 text-sm text-red-600">{errors.otp}</p>
                )}
              </div>

              <div className="text-center mb-6">
                <p className="text-sm text-gray-600">
                  Time remaining: <span className="font-semibold text-primary-600">{formatTime(timer)}</span>
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting || timer === 0}
                icon={isSubmitting ? "fas fa-spinner" : undefined}
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </Button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={timer > 0}
                  className={`text-sm font-medium ${
                    timer > 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-primary-600 hover:text-primary-800'
                  }`}
                >
                  Didn't receive the code? Resend OTP
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to="/signin"
                className="text-primary-600 hover:text-primary-800 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default OTPVerification
