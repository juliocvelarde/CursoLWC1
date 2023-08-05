
public with sharing class ProductsController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProductList() {
        return [
            SELECT
                Id,
                Name,
                Description,
                Imagem__c,
                QuantidadeEmEstoque__c,
                Preco__c
            FROM Product2
            LIMIT 1000
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Product2> findProducts(String searchKey) {
        String key = '%' + searchKey + '%';
        return [
            SELECT  Id,
                Name,
                Description,
                Imagem__c,
                QuantidadeEmEstoque__c,
                Preco__c
            FROM Product2
            WHERE Name LIKE :key
            LIMIT 1000
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Product2 getSingleProduct() {
        return [
            SELECT Id,
                Name,
                Imagem__c,
                QuantidadeEmEstoque__c,
                Preco__c
            FROM Product2
            LIMIT 1
        ];
    }
}