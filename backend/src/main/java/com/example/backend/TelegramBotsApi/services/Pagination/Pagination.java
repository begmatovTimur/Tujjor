package com.example.backend.TelegramBotsApi.services.Pagination;

import org.springframework.data.domain.Page;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.EditMessageText;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.example.backend.TelegramBotsApi.services.TelegramBot.TelegramWebhookBot.execute;

public class Pagination {
    public static com.example.backend.TelegramBotsApi.response.Message doPagination(PaginationConfig config) {
        String customTitle = config.getCustomTitle();
        List<String> fields = config.getFields();
        Boolean editing = config.getEditing();
        Integer previousMessageId = config.getPreviousMessageId();

        Long chatId = config.getChatId();
        Page<?> dataList = config.getDataList();
        Integer page = config.getPage();


        SendMessage sendMessage = new SendMessage();
        System.out.println(dataList.getContent());
        EditMessageText editMessageText = new EditMessageText();
        int PER_PAGE_SIZE = 1;
        page--;

        sendMessage.setChatId(chatId);
        editMessageText.setChatId(chatId);
        editMessageText.enableHtml(true);
        sendMessage.enableHtml(true);



        String headerOfData = customTitle==null?"<b>Natijalar " + (page + 1) + "-" + (dataList.getContent().size()) + "  " + dataList.getTotalPages() + " dan </b>":customTitle+"\n<b>Natijalar " + (page + 1) + "-" + (page + dataList.getContent().size()) + "  " + dataList.getTotalElements() + " dan </b>";


        StringBuilder body = new StringBuilder();
        for (int i = 0; i < dataList.getContent().size(); i++) {
            Object data = dataList.getContent().get(i);
            String itemText = generateItemText(data, i + (page * PER_PAGE_SIZE), (int) dataList.getTotalElements(),fields);
            String text = "";
            text += itemText.substring(0,itemText.lastIndexOf("."));
            text += " ";
            text += itemText.substring(itemText.lastIndexOf(".")+1);
            body.append(text).append("\n");
        }

        String text = headerOfData + "\n\n" + body.toString();

        Map<String, String> buttonsArr = IntStream.rangeClosed(1, config.getLimit())
                .boxed()
                .collect(Collectors.toMap(i -> i.toString(), i -> i.toString()));

        InlineKeyboardMarkup markup = generateInlineKeyboardButtonsForPagination(buttonsArr, 5, page, dataList.getTotalPages() );

        if (editing) {
            editMessageText.setMessageId(previousMessageId);
            editMessageText.setText(text);
            editMessageText.setReplyMarkup(markup);
            return execute.send(editMessageText);
        } else {
            sendMessage.setText(text);
            sendMessage.setReplyMarkup(markup);
            return execute.send(sendMessage);
        }
    }

    private static InlineKeyboardMarkup generateInlineKeyboardButtonsForPagination(Map<String, String> buttonsArr, int columns, int currentPage, int totalPages) {
        InlineKeyboardMarkup markup = new InlineKeyboardMarkup();
        List<List<InlineKeyboardButton>> keyboard = new ArrayList<>();

        List<InlineKeyboardButton> row = new ArrayList<>();
        for (Map.Entry<String, String> entry : buttonsArr.entrySet()) {
            InlineKeyboardButton button = new InlineKeyboardButton();
            button.setText(entry.getValue());
            button.setCallbackData(entry.getKey());
            row.add(button);
            if (row.size() >= columns) {
                keyboard.add(row);
                row = new ArrayList<>();
            }
        }

        if (!row.isEmpty()) {
            keyboard.add(row);
        }

        List<InlineKeyboardButton> navigationRow = new ArrayList<>();
        InlineKeyboardButton previousButton = new InlineKeyboardButton();
        previousButton.setText("◀\uFE0F");
        previousButton.setCallbackData("previous");
        navigationRow.add(previousButton);

        InlineKeyboardButton xButton = new InlineKeyboardButton();
        xButton.setText("❌");
        xButton.setCallbackData("cancel");
        navigationRow.add(xButton);

        InlineKeyboardButton nextButton = new InlineKeyboardButton();
        nextButton.setText("➡\uFE0F");
        nextButton.setCallbackData("next");
        navigationRow.add(nextButton);
        keyboard.add(navigationRow);

        markup.setKeyboard(keyboard);
        return markup;
    }


    private static String generateItemText(Object data, int index, int totalElements, List<String> fieldsToDisplay) {
        StringBuilder itemText = new StringBuilder();

        itemText.append((totalElements - (totalElements - (index + 1)))).append(". ");

        for (String fieldPath : fieldsToDisplay) {
            try {
                Object value = getValueByFieldPath(data, fieldPath);
                itemText.append(fieldPath).append(": ").append(value).append(" ");
            } catch (Exception e) {
                // Handle any exceptions if needed
                e.printStackTrace();
            }
        }

        return itemText.toString();
    }

    private static Object getValueByFieldPath(Object data, String fieldPath) throws NoSuchFieldException, IllegalAccessException {
        String[] fields = fieldPath.split("\\.");
        Object value = data;

        for (String fieldName : fields) {
            Field field = value.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            value = field.get(value);
        }

        return value;
    }
}
