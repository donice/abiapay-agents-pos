"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
// import "./style.scss" // Moved to _app;
import { CustomHeader } from "@/src/components/common/header";
import { GoBackButton } from "@/src/components/common/button";
import { Loading } from "@/src/components/common/loader/redirecting";
import Empty from "@/src/components/common/empty";
import { formatAmount } from "@/src/utils/formatAmount";
import { fetchTransactions } from "@/src/services/ticketsServices";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { MdOutlineRestartAlt } from "react-icons/md";

const TransportTicketDetails = ({ ticketId }) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["get_ticket_details", ticketId],
        queryFn: () => fetchTransactions(),
        enabled: !!ticketId,
    });

    const ticket = data?.data?.find(
        (t) => t.idagent_transactions === parseInt(ticketId)
    );

    if (isLoading) {
        return (
            <div className="loading">
                <Loading />
            </div>
        );
    }

    if (isError || !ticket) {
        return (
            <div className="empty">
                <Empty text="Ticket not found" />
            </div>
        );
    }

    return (
        <section className="ticket-details">
            <GoBackButton />
            <CustomHeader
                title="Ticket Details"
                desc={`Reference: ${ticket.trans_ref}`}
            />

            <div className="ticket-details_container">
                <div className="ticket-details_card">
                    <div className="ticket-details_header">
                        <h2>₦{formatAmount(ticket.amount)}</h2>
                        <span
                            className={`status-badge ${ticket.status === "Completed"
                                ? "completed"
                                : "pending"
                                }`}
                        >
                            {ticket.status === "Completed" ? (
                                <TbRosetteDiscountCheckFilled />
                            ) : (
                                <MdOutlineRestartAlt />
                            )}
                            {ticket.status}
                        </span>
                    </div>

                    <div className="ticket-details_info">
                        <div className="info-row">
                            <span className="label">Transaction Reference</span>
                            <span className="value">{ticket.trans_ref}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Payment Reference</span>
                            <span className="value">{ticket.payment_ref}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Revenue Item</span>
                            <span className="value">{ticket.revenue_item}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Payment Period</span>
                            <span className="value">{ticket.payment_period}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Created</span>
                            <span className="value">
                                {new Date(ticket.createtime).toLocaleString()}
                            </span>
                        </div>
                        <div className="info-row">
                            <span className="label">Next Renewal Date</span>
                            <span className="value next-date">
                                <MdOutlineRestartAlt className="icon" />
                                {new Date(ticket.next_date).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TransportTicketDetails;
