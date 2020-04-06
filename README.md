# Welcome to ASMR

## Usage

### Install dependencies

If you are running this app for the first time, make sure you install yarn dependencies

```
yarn install --frozen-lockfile
```

before running ASMR on ios, you will need to install all the Pods. Make sure you have installed [CocoaPods](https://cocoapods.org/#install) before running the commands below

```
cd ios && pod install && cd ..
```

### Run on iOS (Only available on MacOS. You will need to have XCode installed together with Command Line Tools)

```
yarn ios
```

### Run on Android

```
yarn android
```
