import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { ExchangeService } from './exchange.service';


describe('ExchangeService', () => {
    beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [ ExchangeService, Injectable ]
        });
    });

    it('should be created', inject([ExchangeService], (service: ExchangeService) => {
        expect(service).toBeTruthy();
    }));

    it('should have newEvents method', inject([ExchangeService], (service: ExchangeService) => {
        expect(service.newEvent).toBeTruthy();
    }));

    it('should have getter events', inject([ExchangeService], (service: ExchangeService) => {
        expect(service.events).toBeTruthy();
    }));
});
