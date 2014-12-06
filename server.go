package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"

	"github.com/squiidz/fur"
	"github.com/squiidz/fur/middle"
	"github.com/squiidz/ypage"
)

var (
	DATA []ypage.Entity
	// KEY = "94tshz5uffys3psj569gbhcx"
)

func init() {
	raw, err := ioutil.ReadFile("data.json")
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal(raw, &DATA)
	if err != nil {
		panic(err)
	}
}

func main() {
	f := fur.NewServerMux("", ":8080")

	f.AddRoute("/delete", Delete).Post()
	f.AddRoute("/add", Add).Post()
	f.AddRoute("/noresponse", NoResponse).Post()
	f.AddRoute("/", DefaultHandler, middle.Logger).Get()

	f.AddStatic("/css/", "css")
	f.AddStatic("/js/", "js")
	f.AddStatic("/fonts/", "fonts")

	f.Start()
}

func DefaultHandler(rw http.ResponseWriter, req *http.Request) {
	temp := template.Must(template.ParseFiles("index.html"))
	temp.Execute(rw, DATA[:10])
}

func Add(rw http.ResponseWriter, req *http.Request) {
	data, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Add : ", string(data))
}

func Delete(rw http.ResponseWriter, req *http.Request) {
	data, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Delete : ", string(data))
}

func NoResponse(rw http.ResponseWriter, req *http.Request) {
	data, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("No Response : ", string(data))
}
