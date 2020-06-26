#!/usr/bin/env bash

function setup() {
  setupZsh
  setupBash
}

function setupBash() {
  echo "" >> $HOME/.bashrc
  echo "" >> $HOME/.bashrc
  echo \# This is a flutterman setup. Do not modify. >> $HOME/.bashrc
  echo FLUTTER_HOME=\$HOME/.flutter/sdk/current/flutter >> $HOME/.bashrc
  echo export PATH=\"\$FLUTTER_HOME/bin:\$FLUTTER_HOME/bin/cache/dart-sdk/bin:\$PATH\" >> $HOME/.bashrc
  source $HOME/.bashrc
}

function setupZsh() {
  echo "" >> $HOME/.zshrc
  echo "" >> $HOME/.zshrc
  echo \# This is a flutterman setup. Do not modify. >> $HOME/.zshrc
  echo FLUTTER_HOME=\$HOME/.flutter/sdk/current/flutter >> $HOME/.zshrc
  echo export PATH=\"\$FLUTTER_HOME/bin:\$FLUTTER_HOME/bin/cache/dart-sdk/bin:\$PATH\" >> $HOME/.zshrc
  source $HOME/.zshrc
}

setup