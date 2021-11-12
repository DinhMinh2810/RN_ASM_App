Hybrid App (React-Native)
Here are the installation and compilation instructions of the RentalZ app.
Step 1: Install Visual Studio Code.
Step 2: Install NodeJS via Chocolatey and install JDK.
Open an Administrator Command Prompt run: choco install -y nodejs.install openjdk8
Step 3: Install Android Studio and install the Android SDK
Step 4: Configure the ANDROID_HOME environment variable.
1. Open the Windows Control Panel.
2. Click on User Accounts, then click User Accounts again.
3. Click on Change my environment variables.
4. Click on New... to create a new ANDROID_HOME user variable that points to the path to your Android SDK.
Step 5: Add platform-tools to Path.
1. Open the Windows Control Panel.
2. Click on User Accounts, then click User Accounts again
3. Click on Change my environment variables
4. Select the Path variable.
5. Click Edit.
6. Click New and add the path to platform-tools to the list.
Step 6: Install expo.
Open an Administrator Command Prompt run: npm install --global expo-cli
Step 7: Go to Terminal in Visual Studio Code and run.
expo start
Step 8: Press a to open Android.
Step 9: Experience the RentalZ app.