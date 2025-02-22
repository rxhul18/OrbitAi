import React from 'react'

export default function OrbitLoadingScreen() {
    return (
        <div className="flex items-center justify-center h-screen min-h-[100vh] bg-background">
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold text-muted-foreground">
              Orbit-Ai is syncing...
            </p>
          </div>
        </div>
      );
}
