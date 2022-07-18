package com.example.patientmanager.payload;

import com.example.patientmanager.models.InsurancePackage;

public class InsurancePackageSearchRequest {

    private String keywords;

    private double premiumMax, deductibleMax, copaymentMax, coInsuranceMax, maximumOutOfPocketMax = Integer.MAX_VALUE;

    public InsurancePackageSearchRequest(String keywords, double premiumMax, double deductibleMax, double copaymentMax, double coInsuranceMax, double maximumOutOfPocketMax) {
        this.keywords = keywords;
        this.premiumMax = premiumMax;
        this.deductibleMax = deductibleMax;
        this.copaymentMax = copaymentMax;
        this.coInsuranceMax = coInsuranceMax;
        this.maximumOutOfPocketMax = maximumOutOfPocketMax;
    }

    public InsurancePackageSearchRequest()
    {
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public double getPremiumMax() {
        return premiumMax;
    }

    public void setPremiumMax(double premiumMax) {
        this.premiumMax = premiumMax;
    }

    public double getDeductibleMax() {
        return deductibleMax;
    }

    public void setDeductibleMax(double deductibleMax) {
        this.deductibleMax = deductibleMax;
    }

    public double getCopaymentMax() {
        return copaymentMax;
    }

    public void setCopaymentMax(double copaymentMax) {
        this.copaymentMax = copaymentMax;
    }

    public double getCoInsuranceMax() {
        return coInsuranceMax;
    }

    public void setCoInsuranceMax(double coInsuranceMax) {
        this.coInsuranceMax = coInsuranceMax;
    }

    public double getMaximumOutOfPocketMax() {
        return maximumOutOfPocketMax;
    }

    public void setMaximumOutOfPocketMax(double maximumOutOfPocketMax) {
        this.maximumOutOfPocketMax = maximumOutOfPocketMax;
    }
}
