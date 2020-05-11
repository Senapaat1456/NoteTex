#!/bin/bash
mysql -u root -p < databaseSetup.sql
mysql -u noteTexDatebaseUser -p noteTexDatabase < tableSetup.sql
