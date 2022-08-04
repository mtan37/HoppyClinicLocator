package main

import (
    "fmt"
    "log"
    "net/http"
	"time"
	"context"

    "github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	// load .env files 
	if err := godotenv.Load(); err != nil {
		log.Println(err)
	}

	// establish database connection
	c := connectMongo()

	// disconnect at the end
	defer func() {
		if err := c.client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	router := mux.NewRouter()
	// get all clinics
	router.HandleFunc("/clinics", c.getAllClinicsHandler).Methods("GET")

	// get a single clinic
	router.HandleFunc("/clinics/{id}", c.getOneClinicHandler).Methods("GET")

    srv := &http.Server{
        Addr:         ":23366",
        WriteTimeout: time.Second * 15,
        ReadTimeout:  time.Second * 15,
        IdleTimeout:  time.Second * 60,
        Handler: router,
    }

	if err := srv.ListenAndServe(); err != nil {
		log.Println(err)
	}

    fmt.Println("yes~ The server has started")
}
