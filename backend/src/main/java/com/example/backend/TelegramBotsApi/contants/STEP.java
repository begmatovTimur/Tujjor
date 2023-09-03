package com.example.backend.TelegramBotsApi.contants;

import jakarta.persistence.AssociationOverride;

public enum STEP {
    START,
    SHARING_CONTACT,
    SHARING_CONTACT_VERIFICATION,
    SHARING_PASSWORD,
    VERIFICATED_AGENT,
    ADD_CLIENT,
    CLIENTS_ON_THE_MAP,
    CLIENTS
}
