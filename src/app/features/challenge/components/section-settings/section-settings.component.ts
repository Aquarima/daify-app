import {Component, Input, OnInit} from '@angular/core';
import {Challenge, ChallengeConfig} from "../../../../core";
import {FormControl, FormGroup} from "@angular/forms";
import {Member} from "../../../../core/models/challenge/member.model";

@Component({
    selector: 'dfy-challenge-settings',
    templateUrl: './section-settings.component.html',
    styleUrls: ['./section-settings.component.scss']
})
export class SectionSettingsComponent implements OnInit {

    @Input() challenge!: Challenge;
    @Input() members!: Member[];
    @Input() selfMember: Member | undefined;

    currentSection: number = 0;
    hasBeenUpdated: boolean = false;

    initialConfigForm: any | undefined;

    configForm: FormGroup = new FormGroup({
        title: new FormControl<string>(''),
        description: new FormControl<string>(''),
        theme: new FormControl<string>(''),
        capacity: new FormControl<number>(2),
        group_size: new FormControl<number>(2),
        spectators_allowed: new FormControl<boolean>(false)
    })

    constructor() {
    }

    ngOnInit(): void {
        this.initConfigForm(this.challenge);
        this.configForm.valueChanges.subscribe(() => {
            this.hasBeenUpdated = JSON.stringify(this.initialConfigForm) !== JSON.stringify(this.configForm.value);
        });
    }

    private initConfigForm(challenge: Challenge) {
        const config: ChallengeConfig = challenge.config;
        this.configForm.controls['title'].setValue(challenge.title);
        this.configForm.controls['description'].setValue(challenge.description);
        this.configForm.controls['theme'].setValue(challenge.theme);
        this.configForm.controls['capacity'].setValue(config.capacity);
        this.configForm.controls['group_size'].setValue(config.groupSize);
        this.configForm.controls['spectators_allowed'].setValue(config.spectatorsAllowed);
        this.initialConfigForm = this.configForm.value;
    }

    onOverview() {
        this.showSection(0);
    }

    onMembers() {
        this.showSection(1);
    }

    onDeposits() {
        this.showSection(2);
    }

    onSpectators() {
        this.showSection(3);
    }

    control(name: string) {
        return this.configForm.controls['spectators_allowed'];
    }

    getMemberNickname(member: Member): string {
        return member.nickname ? member.nickname : member.profile.username;
    }

    getMemberRole(member: Member): string {
        return member.role ? member.role : member.profile.profession;
    }

    getMemberAvatar(member: Member): string {
        return member.profile.avatarUrl ? member.profile.avatarUrl : 'assets/challenge_icon_placeholder.svg';
    }

    isSelfMember(member: Member) {
        return this.selfMember?.id === member.id;
    }

    isSelfMemberAuthor(): boolean {
        return this.selfMember?.id === this.challenge.author.id;
    }

    showSection(index: number) {
        this.currentSection = index;
    }

    isOnSection(index: number) {
        return this.currentSection === index;
    }
}
