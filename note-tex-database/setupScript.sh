#!/bin/bash
sudo mysql < databaseSetup.sql
sudo mysql noteTexDatabase < tableSetup.sql
