### API SPORTS

+ URL: /api/users/register
+ METHOD: POST
+ HEADERS: X
+ BODY: username, password

@ INPUT:
    - A Json like the next one:
        - {
            "username" : "Andry", 
            "password" : "HolaMarioQueTalElDiaEsperoQueBien"
        }

@ OUTPUT:
    - A Json with the user created like this:
        - {
            "id": 1,
            "username" : "Andry", 
            "password" : "HolaMarioQueTalElDiaEsperoQueBien"
        }

---------------------------------------

+ URL: /api/users/login
+ METHOD: POST
+ HEADERS: X
+ BODY: username, password

@ INPUT:
    - A Json like the next one:
        - {
            "username" : "Andry", 
            "password" : "HolaMarioQueTalElDiaEsperoQueBien"
        }

@ OUTPUT:
    - A Json with the user created like this:
        - {
            "token" : "DeVerdadTeLeesTodoElCodigoMario?NoSeSiYoLoHariaAunqueFueraProfesor"
        }

---------------------------------------

+ URL: /api/users/profile
+ METHOD: POST
+ HEADERS: X
+ BODY: username, password

@ INPUT:
    - A Json like the next one:
        - {
            "username" : "Andry", 
            "password" : "HolaMarioQueTalElDiaEsperoQueBien"
        }

@ OUTPUT:
    - A Json with the user created like this:
        - {
            "token" : "DeVerdadTeLeesTodoElCodigoMario?NoSeSiYoLoHariaAunqueFueraProfesor"
        }

---------------------------------------