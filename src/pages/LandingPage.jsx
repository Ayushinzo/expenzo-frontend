import React from 'react'
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Bounce, ToastContainer } from 'react-toastify';

function LandingPage() {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        theme="colored"
        transition={Bounce}
      />
      <div className="min-h-screen bg-gray-50">
        <header className='flex items-center justify-between px-2 sm:p-6 py-4 bg-white shadow-sm fixed left-0 right-0 top-0 z-30'>
          <div className='flex items-center gap-3'>
            <img className='w-[50px] h-[50px] object-contain' src="logo.png" alt="Logo" />
            <h2 className='font-bold text-2xl text-blue-800'>Expenzo</h2>
          </div>
          <div className='flex gap-4'>
            <Stack spacing={window.innerWidth >= 640 ? 2 : 0.5} direction="row">
              <Button sx={{ padding: 0 }} variant="text">
                <Link
                  to="/auth/sign-in"
                  className='py-2 px-4'
                >
                  Sign In
                </Link>
              </Button>
              <Button sx={{ padding: 0 }} variant="contained">
                <Link
                  to="/auth/sign-in"
                  className='py-2 px-4'
                >
                  Sign Up
                </Link>
              </Button>
            </Stack>
          </div>
        </header>
        <div className='mt-[70px]'>
          <main className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Take Control of Your Finances with Ease
              </h1>
              <p className="text-gray-600 mb-2 font-bold text-2xl">Track. Save. Grow.</p>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Stay on top of your spending with our smart and simple expense tracker. Whether you're budgeting for a trip, managing daily expenses, or planning long-term savings, our tool helps you make sense of your money — effortlessly.
              </p>
              <Button color="success" variant="contained">
                <Link to="/auth/sign-in" className="inline-block px-5 py-2 text-white rounded-lg transition-colors text-lg font-semibold w-full h-full">
                  Start Tracking Now
                </Link>
              </Button>
              <p className="text-sm text-gray-600 mt-4">Free to start. No credit card required.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="p-6 bg-white rounded-lg shadow-sm ">
                <h3 className="font-semibold text-lg mb-3">Real-Time Expense Tracking</h3>
                <p className="text-gray-600">Monitor your spending as it happens</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-3">Custom Budgets & Categories</h3>
                <p className="text-gray-600">Organize your finances your way</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-3">Visual Reports & Insights</h3>
                <p className="text-gray-600">Understand your spending patterns</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-3">Secure & Private</h3>
                <p className="text-gray-600">Your data stays safe and protected</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default LandingPage;