# Introduction

Factile uses REST API that provide for most of the system's functionality, and hence can be used to assemble alternative UIs and integrations. 

All Factile API are accessible over HTTP(S) and support JSON format for data exchange.

There are 2 types of APIs - public ones that do not require an authentication token, and protected ones that do. The authentication token is expected as a HTTP request header `Authorization` of the format `Bearer {token}`. The token can be obtained from the Login API.