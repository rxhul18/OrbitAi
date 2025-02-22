import React from 'react'

export default function OrbitLoadingScreen() {
    return (
        <div className="flex items-center justify-center h-screen min-h-[100vh]">
          <div className="flex flex-col items-center">
            {/* <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-white"></div> */}
            <p className="text-2xl font-bold text-muted-foreground">
              Orbit-Ai is syncing...
            </p>
          </div>
        </div>
      );
}
