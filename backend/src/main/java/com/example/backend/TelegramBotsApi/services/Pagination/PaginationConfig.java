package com.example.backend.TelegramBotsApi.services.Pagination;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class PaginationConfig {
    Page<?> dataList;
    List<String> fields = new ArrayList<>();
    Integer previousMessageId;
    Integer page;
    Long chatId;
    Boolean editing;
    String customTitle;
    Integer limit;

    public static PaginationConfig of(
            Page<?> dataList,
            List<String> fields,
            Integer previousMessageId,
            Integer page,
            Long chatId,
            Boolean editing,
            String customTitle,
            Integer limit
    ) {
        return new PaginationConfig(
                dataList,
                fields,
                previousMessageId,
                page,
                chatId,
                editing,
                customTitle,
                limit
        );
    }

    public PaginationConfig(Page<?> dataList, List<String> fields, Integer previousMessageId, Integer page, Long chatId, Boolean editing, Integer limit) {
        this.dataList = dataList;
        this.fields = fields;
        this.previousMessageId = previousMessageId;
        this.page = page;
        this.chatId = chatId;
        this.editing = editing;
        this.limit = limit;
    }

    public static PaginationConfig of(
            Page<?> dataList,
            List<String> fields,
            Integer previousMessageId,
            Integer page,
            Long chatId,
            Boolean editing,
            Integer limit
    ) {
        return new PaginationConfig(
                dataList,
                fields,
                previousMessageId,
                page,
                chatId,
                editing,
                limit

        );
    }

    public PaginationConfig(Page<?> dataList, List<String> fields, Integer previousMessageId, Integer page, Long chatId, Boolean editing, String customTitle, Integer limit) {
        this.dataList = dataList;
        this.fields = fields;
        this.previousMessageId = previousMessageId;
        this.page = page;
        this.chatId = chatId;
        this.editing = editing;
        this.customTitle = customTitle;
        this.limit = limit;
    }
}
