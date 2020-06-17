# Flutterman

Flutterman is a SDK version manager for flutter.

## How to install

Install package from npmjs.org:
```
npm install -g flutterman
```

## How to use

You simply run in your command line:

```
flutterman
```

It will be presented a few options. First, you will be asked for select the **channel** to download the sdk (the default options is **stable**):

```
? Select flutter channel › - Use arrow-keys. Return to submit.
    dev
    beta
❯   stable
```

After that, you will be prompted to select the desired **version** from the channel that you previously select (this versions are online consulted from flutter services):

```
? Select flutter version from channel "stable" › - Use arrow-keys. Return to submit.
❯   1.17.3 *
    1.17.2 *
    1.17.1
    1.17.0
    v1.12.13+hotfix.9
    v1.12.13+hotfix.8
    v1.12.13+hotfix.7
    v1.12.13+hotfix.5
    v1.9.1+hotfix.6
  ↓ v1.9.1+hotfix.5
```

> Note: The versions marked with * are versions that you already have previously downloaded.

And last, you will be prompted to answer if you want this to be the current version in your **PATH**:

```
? Do you want to make 1.17.1 (stable) the current version? › No / Yes
```

Then, if you don't have this versions, the **flutterman** will download this version for you:

```
Preparing to download stable/macos/flutter_macos_1.17.1-stable.zip file...

██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 5% | ETA: 70s
```

After finish, will extract the gzip file into **flutterman** home directory, and, if you select **YES** in the previous question, it will be set to you current versions.

And then, you can enjoy your flutter client installed!

```
$ flutter --version

  Flutter 1.17.1 • channel stable • https://github.com/flutter/flutter.git
  Framework • revision f7a6a7906b (5 weeks ago) • 2020-05-12 18:39:00 -0700
  Engine • revision 6bc433c6b6
  Tools • Dart 2.8.2
```
## Questions, issues and other questions

You can open an issue on this github repository (https://github.com/orlandoburli/flutterman) or send a email to: orlando.burli@gmail.com

Thank's for your support!