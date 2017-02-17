@echo on

:: PHONEGAP BUILD
call phonegap build android --release

:: SIGN
set APK_PATH=%CD%\platforms\android\build\outputs\apk\android-release-unsigned.apk
set BUILD_PATH=%CD%\build\StalkNet.apk

echo %APK_PATH% %BUILD_PATH%

call jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore stalknet-key.keystore %APK_PATH% stalknet-key
call jarsigner -verify -verbose -certs %APK_PATH%
call DEL /F /Q %BUILD_PATH%
call zipalign -v 4 %APK_PATH% %BUILD_PATH%
