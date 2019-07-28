Q:
What is the purpose of using _sessions_?

A:
Sessions can be used to store information about the login state of a user even when he reloads the stateless HTTP website. Routes can be restricted there is no need to always login again and the server can enforce logout timeouts for security.

Q:
What does bcrypt do to help us store passwords in a secure manner.

A:
With Bcrypt we can use the power of cryptography to not save passwords in plain text into the db and thus achieve more security for the application. It allows a developer to use mathematically strong hashing functions to convert a given passwort into a unrevertable hashstring which is then stored in the database.

Q:
What does bcrypt do to slow down attackers?

A:
BCrypt tries not to be fast, but to be slow. It rehashes given strings multiple times and by this making the requested user wait a couple of seconds. THis makes brute force attacks way harder as you can only test so many passwords per minute but maybe neeed to test billions of passwords.

Q:
What are the three parts of the JSON Web Token?

A:
A JSON Web Token consists of:
-The Header which contains information about the used hashing algorithm and the type of the JWT
-The Payload is the data that a developer can store information on. It just be used as lightweight as possible and is not encrypted to take care of sensitive information
-The signature is the last part and contains a cryptographical verification that allows anyone to check if the whole JWT was rightfully signed by the creator/the server. So the client or middlemen can't manipulate the payload and everybody can verify it.
