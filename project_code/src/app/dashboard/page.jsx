"use client";
import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import "./style.css";

const Dashboard = () => {
  const list = [
    {
      title: "Ammar",
      img: "project-codesrcappdashboardassetsA.jpg",
      name: "Ammar",
    },
    {
      title: "Fazeel",
      img: "project-codesrcappdashboardassetsF.jpg",
      name: "Fazeel",
    },
    {
      title: "Rachana",
      img: "project-codesrcappdashboardassetsR.jpg",
      name: "Rachana",
    },
    {
      title: "Sonum",
      img: "project-code/src/app/dashboard/assets/S.jpg",
      name: "Sonum",
    },
    {
      title: "Hanumath",
      img: "project-codesrcappdashboardassetsU.jpg",
      name: "Hanumath",
    },
    {
      title: "Wasif",
      img: "project-codesrcappdashboardassetsW.jpg",
      name: "Wasif",
    },
  ];
  return (
    <div className="main-content">
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          Dashboard
        </header>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          <div class="bg-primary-500 text-primary-50 rounded-small px-2 py-1">
            MEET THE GROUP:
          </div>
          <span></span>
          <span></span>
          <span></span>

          {list.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.title}</b>
                <p className="text-default-500">{item.name}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
