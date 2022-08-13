package main

import (
    "fmt"
    "net/http"
	"log"
	"os"
	"context"
	"encoding/json"


    "github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type DabaseClinent struct {
	client *mongo.Client
}

func connectMongo() (*DabaseClinent) {
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("Please set 'MONGODB_URI', Following format of MongoDB connection string")
	}

	fmt.Println("test: ", uri)

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}

	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		log.Fatal(err)
	}
	
	client_wrapper := &DabaseClinent{
		client: client,
	}

	return client_wrapper
}

func (c *DabaseClinent) getAllClinicsHandler(w http.ResponseWriter, r *http.Request) {
	coll := c.client.Database("hoppydb").Collection("clinics")

	cursor, err := coll.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(context.TODO())


	var allClinics []bson.M
	if err = cursor.All(context.TODO(), &allClinics); err != nil {
		panic(err)
	}

    w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(allClinics)
}

func (c *DabaseClinent) getOneClinicHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, "The clinic id is: %v\n", vars["id"])
	w.Write([]byte("getOneClinicHandler called\n"))
}