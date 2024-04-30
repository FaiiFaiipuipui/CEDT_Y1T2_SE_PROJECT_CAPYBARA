"use client";
import React, { useState } from "react";
import { Session } from "next-auth";
import TransactionCard from "./TransactionCard";
import {
  PaymentJson,
  PaymentItem,
  AppointmentJson,
  AppointmentItem,
} from "interface";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemText } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
});

export default function TransactionCatalog({
  appointments,
  session,
  role,
}: {
  appointments: AppointmentItem[];
  session: Session;
  role: string;
}) {
  const [statusFilter, setStatusFilter] = useState("Default");
  const statusList = [
    "Default",
    "WAITING",
    "VERIFYING",
    "REJECTED",
    "COMPLETED",
  ];

  //For mui drop down list
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setStatusFilter(statusList[index]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <main className="text-center">
      <div className="rounded-[50px] items-center justify-center border border-solid">
        <div className="flex flex-row bg-cadetblue text-xl h-20 items-center rounded-t-[50px] font-semibold">
          <div className="w-1/5">User</div>
          <div className="w-1/5">Campground</div>
          <div className="w-1/5">Date</div>

          <div className="w-1/5 flex flex-row z-30">
            {/* Transaction Status */}
            <List component="nav" aria-label="Transaction Status">
              {
                <ListItemButton
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClickListItem}
                  className="flex"
                >
                  <ListItemText>
                    <div className="text-xl">
                      <div className={prompt.className}>
                        Transaction Status
                        <KeyboardArrowDownIcon />
                      </div>
                    </div>
                  </ListItemText>
                </ListItemButton>
              }
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              }}
            >
              {statusList.map((statusList, index) => (
                <MenuItem
                  key={statusList}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  <div className={prompt.className}>{statusList}</div>
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div className="w-1/5"></div>
        </div>
        {statusFilter === "Default" ? (
          <div>
            {appointments.map((apptItem) => (
              <TransactionCard
                key={apptItem._id}
                user={apptItem.user?.name}
                campground={apptItem.campground}
                date={new Date(apptItem.apptDate)}
                transaction={apptItem.transaction}
                role={role}
              />
            ))}
          </div>
        ) : (
          <div>
            {appointments
              .filter(
                (apptItem) => apptItem.transaction.status === statusFilter
              )
              .map((apptItem) => (
                <TransactionCard
                  key={apptItem._id}
                  user={apptItem.user.name}
                  campground={apptItem.campground}
                  date={new Date(apptItem.apptDate)}
                  transaction={apptItem.transaction}
                  role={role}
                />
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
